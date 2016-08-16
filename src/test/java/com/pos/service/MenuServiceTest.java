package com.pos.service;

import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.pos.model.application.Item;
import com.pos.model.application.ItemType;
import com.pos.model.application.Price;
import com.pos.utils.TestUtils;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:/test-config.xml" })
public class MenuServiceTest {

    @Autowired
    private MenuService menuService;

    @Test
    public void testGroupItemsByType() {
        Item car1 = TestUtils.createCar(Price.nothing());
        Item car2 = TestUtils.createCar(Price.nothing());
        Item car3 = TestUtils.createCar(Price.nothing());

        String testType = "Test";

        Item testItem1 = TestUtils.createItem(testType, "", Price.nothing());
        Item testItem2 = TestUtils.createItem(testType, "One", Price.nothing());
        Item testItem3 = TestUtils.createItem(testType, "Two", Price.nothing());

        List<Item> items = new LinkedList<>();

        items.add(car1);
        items.add(car2);
        items.add(car3);

        items.add(testItem1);
        items.add(testItem2);
        items.add(testItem3);

        Map<ItemType, List<Item>> groupedByType = menuService.groupItemByType(items);

        Assert.assertEquals("Key size does not match. Items are not grouped correctly.", 2, groupedByType.keySet().size());
    }

    @Test
    public void testTestGroupMenuItemsByType() {

    }

}