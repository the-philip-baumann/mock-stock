import math
from threading import current_thread
from flask import Blueprint
from flask_login import login_required, current_user
import finance
import db

me = Blueprint('me', __name__)


def check_nan(money_in_stocks):
    if math.isnan(money_in_stocks):
        return None
    return money_in_stocks


@me.route("/me")
@login_required
def get_me():
    try:
        user = current_user
        money_in_stocks = 0.0

        owned_stocks = db.get_owned_stocks(current_user.username)
        stock_ids = [key for _, key in enumerate(owned_stocks)]

        if stock_ids:
            stocks = finance.get_stocks(stock_ids)
            for stock in stocks:
                stock.amount = owned_stocks[stock.id].amount
                money_in_stocks += stock.amount * stock.value
            
            user.stocks = [stock.to_dict() for stock in stocks]

        user.money_in_stocks = check_nan(money_in_stocks)
        
        return user.to_dict()

    except Exception as e:
        return str(e), 400