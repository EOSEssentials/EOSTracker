import { Injectable } from '@angular/core';
import * as Eos from 'eosjs';
import { environment } from '../../environments/environment';
import { Observable, from, of, timer } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Block, Transaction, Result } from '../models';

@Injectable()
export class EosService {
  public eos: any;

  constructor() {
    this.eos = Eos({
      httpEndpoint: environment.blockchainUrl,
      blockId: environment.chainId
    });
  }

  getInfo(interval = 5000): Observable<any> {
    return timer(0, interval).pipe(
      switchMap(() => from(this.eos.getInfo({})))
    );
  }

  getAccount(name: string): Observable<any> {
    return from(this.eos.getAccount(name));
  }

  getBlock(id: string | number): Observable<Result<Block>> {
    return from(this.eos.getBlock(id)).pipe(
      map((block: any) => {
        return <Result<Block>>{
          isError: false,
          value: {
            actionMerkleRoot: block.action_mroot,
            blockNumber: block.block_num,
            confirmed: block.confirmed,
            id: block.id,
            newProducers: block.new_producers,
            numTransactions: block.transactions.length,
            prevBlockId: block.previous,
            producer: block.producer,
            timestamp: new Date(block.timestamp).getTime() / 1000,
            transactionMerkleRoot: block.transaction_mroot,
            version: block.schedule_version
          }
        };
      }),
      catchError(error => {
        console.log('TODO: Log Chain Error', error);
        return of(<Result<Block>>{
          isError: true,
          error: error
        });
      })
    );
  }

  getTransaction(id: string): Observable<Result<Transaction>> {
    return from(this.eos.getTransaction({ id })).pipe(
      map((transaction: any) => {
        return <Result<Transaction>>{
          isError: false,
          value: {
            blockId: transaction.block_num,
            createdAt: new Date(transaction.block_time).getTime() / 1000,
            expiration: new Date(transaction.trx.trx.expiration).getTime() / 1000,
            id: transaction.id,
            numActions: transaction.trx.trx.actions.length,
            pending: transaction.trx.trx.delay_sec > 0,
            updatedAt: new Date(transaction.block_time).getTime() / 1000
          }
        };
      }),
      catchError(error => {
        console.log('TODO: Log Chain Error', error);
        return of(<Result<Transaction>>{
          isError: true,
          error: error
        });
      })
    );
  }

  getTransactionHistory(id: string, blockNumber: number): Observable<any> {
    return from(this.eos.getTransaction({
      id: id,
      block_num_hint: blockNumber
    }));
  }

  getCurrencyBalance(name: string): Observable<number> {
    return from(this.eos.getCurrencyBalance('eosio.token', name, 'EOS')).pipe(
      map(result => {
        if (result && result[0]) {
          return parseFloat(result[0].replace(' EOS', ''));
        }
        return 0;
      })
    );
  }

  getRamPrice(): Observable<number> {
    return from(this.eos.getTableRows({
      json: true,
      code: "eosio",
      scope: "eosio",
      table: "rammarket",
      limit: 1
    })).pipe(
      map((result: any) => {
        let base = parseFloat(result.rows[0].base.balance.replace(' RAM', ''));
        let quote = parseFloat(result.rows[0].quote.balance.replace(' EOS', ''));
        return quote / base;
      })
    );
  }

  getProducers() {
    return from(this.eos.getTableRows({
      json: true,
      code: "eosio",
      scope: "eosio",
      table: "producers",
      limit: 700,
      table_key: ""
    })).pipe(
      map((result: any) => {
        return result.rows
          .map(row => ({ ...row, total_votes: parseFloat(row.total_votes) }))
          .sort((a, b) => b.total_votes - a.total_votes);
      })
    );
  }

  getChainStatus() {
    return from(this.eos.getTableRows({
      json: true,
      code: "eosio",
      scope: "eosio",
      table: "global",
      limit: 1
    })).pipe(
      map((result: any) => result.rows[0])
    );
  }
}
