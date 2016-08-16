package com.pos.model;

import java.util.ArrayList;
import java.util.List;

import org.junit.Assert;
import org.junit.Test;

import com.pos.model.application.Order;
import com.pos.model.application.OrderDetails;
import com.pos.model.application.Price;
import com.pos.utils.TestUtils;

public class OrderTest {

    @Test
    public void testTotalAmount1() {
        int dollar_7000 = 7000;
        int cent_0 = 0;

        int dolloar_500 = 500;
        int cent_50 = 50;

        int quantity_1 = 10;
        int quantity_2 = 4;

        Price price1 = TestUtils.createPrice(dollar_7000, cent_0);
        Price price2 = TestUtils.createPrice(dolloar_500, cent_50);

        OrderDetails CarOrderDetails1 = TestUtils.CreateCarOrderDetails(price1, quantity_1, null);
        OrderDetails CarOrderDetails2 = TestUtils.CreateCarOrderDetails(price2, quantity_2, null);

        List<OrderDetails> orderDetails = new ArrayList<>();
        orderDetails.add(CarOrderDetails1);
        orderDetails.add(CarOrderDetails2);

        Order carOrder = TestUtils.createOrder(orderDetails);

        Price subTotal1 = Price.multiply(price1, quantity_1);
        Price subTotal2 = Price.multiply(price2, quantity_2);
        Price total = Price.add(subTotal1, subTotal2);

        Assert.assertTrue("Should be equal", carOrder.getTotalAmount().equals(total));

    }

    @Test
    public void testTotalQuantity1() {
        int dollar_7000 = 7000;
        int cent_0 = 0;

        int dolloar_500 = 500;
        int cent_50 = 50;

        int quantity_1 = 10;
        int quantity_2 = 4;

        Price price1 = TestUtils.createPrice(dollar_7000, cent_0);
        Price price2 = TestUtils.createPrice(dolloar_500, cent_50);

        OrderDetails CarOrderDetails1 = TestUtils.CreateCarOrderDetails(price1, quantity_1, null);
        OrderDetails CarOrderDetails2 = TestUtils.CreateCarOrderDetails(price2, quantity_2, null);

        List<OrderDetails> orderDetails = new ArrayList<>();
        orderDetails.add(CarOrderDetails1);
        orderDetails.add(CarOrderDetails2);

        Order carOrder = TestUtils.createOrder(orderDetails);

        Assert.assertTrue("Should be equal", carOrder.getTotalQuantity() == quantity_1 + quantity_2);
    }

}