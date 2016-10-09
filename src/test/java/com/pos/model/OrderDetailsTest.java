package com.pos.model;

import org.junit.Assert;
import org.junit.Test;

import com.pos.model.application.Item;
import com.pos.model.application.OrderDetails;
import com.pos.model.application.Price;
import com.pos.utils.TestUtils;

public class OrderDetailsTest {

    @Test
    public void testNewPrice1() {
        long itemTypeId = 1L;

        int dollar_7 = 7;
        int cent_10 = 10;

        int dollar_10 = 10;
        int cent_7 = 7;

        Price before = TestUtils.createPrice(dollar_7, cent_10);
        Price after = TestUtils.createPrice(dollar_10, cent_7);
        Item car = TestUtils.createCar(itemTypeId, before);
        int quantity = 1;

        OrderDetails orderDetails = TestUtils.createOrderDetails(car, quantity,
                after);

        Assert.assertFalse("Should not be equal.",
                before.equals(orderDetails.getPrice()));
        Assert.assertTrue("Should be equal",
                after.equals(orderDetails.getPrice()));
    }

    @Test
    public void testNewPrice2() {
        long itemTypeId = 1L;

        int dollar_7 = 7;
        int cent_10 = 10;

        Price before = TestUtils.createPrice(dollar_7, cent_10);
        Price after = null;
        Item car = TestUtils.createCar(itemTypeId, before);
        int quantity = 1;

        OrderDetails orderDetails = TestUtils.createOrderDetails(car, quantity,
                after);

        Assert.assertTrue("Should be equal.",
                before.equals(orderDetails.getPrice()));
    }

    @Test
    public void testSubtotal1() {
        long itemTypeId = 1L;

        int dollar_7 = 7;
        int cent_10 = 10;

        Price price = TestUtils.createPrice(dollar_7, cent_10);
        Item car = TestUtils.createCar(itemTypeId, price);
        int quantity = 10;

        OrderDetails orderDetails = TestUtils.createOrderDetails(car, quantity,
                null);

        Assert.assertTrue("Should be equal.",
                price.equals(orderDetails.getPrice()));
    }
}