import {Component, OnInit} from '@angular/core';
import {StockService} from "../../services/stock/stock.service";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.scss']
})
export class StockDetailComponent implements OnInit {

  basicData: any
  basicOptions: any
  isAuthorised = false
  isStocks = false
  isMoney = false
  stock: any
  change = ''
  value = ''
  id: string | undefined
  ownedAmount = 0;
  amountToManipulate = 0;

  constructor(private stockservice: StockService,
              private route: ActivatedRoute,
              private authService: AuthService,
              private userService: UserService,
              private stockService: StockService) {
  }

  async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.isAuthorised = await this.isAuthorized()
    this.isMoney = await this.hasMoney()
    this.isStocks = await this.hasStocks()
    this.stock = JSON.parse((await this.stockservice.getStock(this.id)).body)
    this.value = this.stock.value;
    this.change = this.stock.change;
    const historyValues = Object.values(this.stock.history)
    const historyKeys = Object.keys(this.stock.history)
    this.basicData = {
      labels: this.parseDate(historyKeys),
      datasets: [
        {
          label: this.stock.name,
          data: [...historyValues],
          fill: false,
          borderColor: '#42A5F5',
          tension: .1
        }
      ]
    }
  }

  parseDate(dates: string[]): string[] {
    return dates.map((date) => new Date(date).toLocaleDateString("de-CH"))
  }


  updateOptions() {
    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: '#495057'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        },
        y: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        }
      }
    };
  }

  async isAuthorized(): Promise<boolean> {
    const authStatus = await this.authService.isLoggedin()
    return authStatus.body != 'False';
  }

  async hasStocks(): Promise<boolean> {
    if(this.isAuthorised) {
      let response = JSON.parse((await this.userService.getOwnUser()).body.replace(/\bNaN\b/g, "null"))
      return await this.getStockAmount(response.stocks) > 0
    }
    return false;
  }

  async getStockAmount(stocks: any): Promise<number> {
    for (const stock of stocks) {
      if (stock.id === this.id) {
        this.ownedAmount = stock.amount
        return stock.amount;
      }
    }
    return 0
  }

  async hasMoney(): Promise<boolean> {
    if(this.isAuthorised) {
      let response = JSON.parse((await this.userService.getOwnUser()).body.replace(/\bNaN\b/g, "null"))
      return response.money_liquid > 0
    }
    return false;
  }

  async buyStock(amount: number){
    await this.stockService.buyStock(this.id!, amount)
    location.reload()
  }

  async sellStock(amount: number){
    await this.stockService.sellStock(this.id!, amount * (-1))
    location.reload()
  }
}
