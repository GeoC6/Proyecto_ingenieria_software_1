import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  transactionsDataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['COD_CLIENTE', 'TRANSACTION_DATE', 'AMOUNT', 'STATUS', 'CODE'];

  constructor(private transactionService: TransactionService) {
    this.transactionsDataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {
    this.transactionService.getTransactions().subscribe(
      (data: any[]) => {
        this.transactionsDataSource.data = data;
      },
      (error: any) => {
        console.error('Error al obtener las transacciones', error);
      }
    );
  }
}
