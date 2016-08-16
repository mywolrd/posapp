package com.pos.model;

import org.junit.Assert;
import org.junit.Test;

import com.pos.model.application.ItemType;

public class ItemTypeTest {

    private String item1 = "ITEM1";
    private String item2 = "ITEM2";

    @Test
    public void testEquals_true() {
        ItemType type1 = new ItemType(item1);
        ItemType type2 = new ItemType(item1);

        Assert.assertTrue("Should equal", type1.equals(type2));
    }

    @Test
    public void testEquals_false() {
        ItemType type1 = new ItemType(item1);
        ItemType type2 = new ItemType(item2);

        Assert.assertFalse("Should not equal", type1.equals(type2));
    }

    @Test(expected = RuntimeException.class)
    public void testNull() {
        new ItemType(null);
    }

}