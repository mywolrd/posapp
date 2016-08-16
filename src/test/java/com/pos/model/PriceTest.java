package com.pos.model;

import org.junit.Assert;
import org.junit.Test;

import com.pos.model.application.Price;

public class PriceTest {

    @Test
    public void testPrice1() {
        Price a = new Price.PriceBuilder().build();

        Assert.assertFalse("Dollar amount should be 0", 1 == a.getDollar());
        Assert.assertEquals("Cent amount should match 0", 0, a.getCent());
    }

    @Test
    public void testAdd_1() {
        Price a = new Price.PriceBuilder().cent(75).dollar(1).build();
        Price b = new Price.PriceBuilder().cent(75).dollar(3).build();

        Price sum = Price.add(a, b);

        Assert.assertEquals("Dollar amount should match 5", 5, sum.getDollar());
        Assert.assertEquals("Cent amount should match 50", 50, sum.getCent());
    }

    @Test
    public void testMultiply_1() {
        Price a = new Price.PriceBuilder().cent(75).dollar(1).build();

        Price result = Price.multiply(a, 5);

        Assert.assertEquals("Dollar amount should match 5", 8, result.getDollar());
        Assert.assertEquals("Cent amount should match 50", 75, result.getCent());
    }
}