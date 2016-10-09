package com.pos.model;

import org.junit.Assert;
import org.junit.Test;

import com.pos.model.application.ItemType;

public class ItemTypeTest {

    private String item1 = "ITEM1";
    private String item2 = "ITEM2";

    private long itemTypeId_1 = 1L;
    private long itemTypeId_2 = 2L;

    private int weight_1 = 1;
    private int weight_2 = 2;

    @Test
    public void testEquals_true() {
        ItemType type1 = new ItemType(itemTypeId_1, item1, weight_1, true);
        ItemType type2 = new ItemType(itemTypeId_1, item1, weight_1, true);

        Assert.assertTrue("Should equal", type1.equals(type2));
    }

    @Test
    public void testEquals_false_id() {
        ItemType type1 = new ItemType(itemTypeId_1, item1, weight_1, true);
        ItemType type2 = new ItemType(itemTypeId_2, item1, weight_1, true);

        Assert.assertFalse("Should not equal", type1.equals(type2));
    }

    @Test
    public void testEquals_false_name() {
        ItemType type1 = new ItemType(itemTypeId_1, item1, weight_1, true);
        ItemType type2 = new ItemType(itemTypeId_1, item2, weight_1, true);

        Assert.assertFalse("Should not equal", type1.equals(type2));
    }

    @Test
    public void testEquals_false_weight() {
        ItemType type1 = new ItemType(itemTypeId_1, item1, weight_1, true);
        ItemType type2 = new ItemType(itemTypeId_1, item1, weight_2, true);

        Assert.assertFalse("Should not equal", type1.equals(type2));
    }

    @Test(expected = RuntimeException.class)
    public void testNull() {
        new ItemType(0L, null, 1, true);
    }

}