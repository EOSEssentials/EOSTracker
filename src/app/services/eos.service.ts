import * as Eos from 'eosjs';
import * as moment from 'moment';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, from, of, timer, defer } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Block, Transaction, Result } from '../models';
import { LoggerService } from './logger.service';

@Injectable()
export class EosService {
  public eos: any;

  constructor(
    private logger: LoggerService
  ) {
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

  getBlockRaw(id: string | number): Observable<Result<any>> {
    const getBlock$ = defer(() => from(this.eos.getBlock(id)));
    return getBlock$.pipe(
      map((block: any) => {
        return <Result<Block>>{
          isError: false,
          value: block
        };
      }),
      catchError(error => {
        this.logger.error('CHAIN_ERROR', error);
        return of({
          isError: true,
          value: error
        });
      })
    );
  }

  getBlock(id: string | number): Observable<Result<Block>> {
    // convert chain promise to cold observable
    const getBlock$ = defer(() => from(this.eos.getBlock(id)));
    return getBlock$.pipe(
      map((block: any) => {
        return <Result<Block>>{
          isError: false,
          value: <Block>{
            actionMerkleRoot: block.action_mroot,
            blockNumber: block.block_num,
            confirmed: block.confirmed,
            id: block.id,
            newProducers: block.new_producers,
            numTransactions: block.transactions.length,
            prevBlockId: block.previous,
            producer: block.producer,
            timestamp: moment.utc(block.timestamp).unix(),
            timestampISO: moment.utc(block.timestamp).toISOString(),
            transactionMerkleRoot: block.transaction_mroot,
            version: block.schedule_version,
            transactions: block.transactions.map(transaction => {
              return <Transaction>{
                blockId: block.block_num,
                createdAt: moment.utc(block.timestamp).unix(),
                createdAtISO: moment.utc(block.timestamp).toISOString(),
                expiration: moment.utc(transaction.trx.transaction.expiration).unix(),
                expirationISO: moment.utc(transaction.trx.transaction.expiration).toISOString(),
                id: transaction.trx.id,
                numActions: transaction.trx.transaction.actions.length,
                pending: transaction.trx.transaction.delay_sec > 0,
                updatedAt: moment.utc(block.timestamp).unix(),
                updatedAtISO: moment.utc(block.timestamp).toISOString(),
                chainData: transaction
              };
            }),
            chainData: block
          }
        };
      }),
      catchError(error => {
        this.logger.error('CHAIN_ERROR', error);
        return of({
          isError: true,
          value: error
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
        return of({
          isError: true,
          value: error
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
