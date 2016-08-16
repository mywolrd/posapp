package com.pos.utils;

import java.util.List;

import com.pos.model.application.Item;
import com.pos.model.application.ItemType;
import com.pos.model.application.Order;
import com.pos.model.application.OrderDetails;
import com.pos.model.application.Price;

public class TestUtils {

    public static ItemType createItemType(String name) {
        return new ItemType(name);
    }

    public static Item createItem(String typeName, String itemName, Price price) {
        return new Item.ItemBuilder(new ItemType(typeName), price).name(itemName).build();
    }

    public static Price createPrice(int dollar, int cent) {
        return new Price.PriceBuilder().dollar(dollar).cent(cent).build();
    }

    public static OrderDetails createOrderDetails(Item item, int quantity, Price newPrice) {
        return new OrderDetails.OrderDetailsBuilder(item).quantity(quantity).newPrice(newPrice).build();
    }

    public static Item createCar(Price price) {
        return new Item.ItemBuilder(new ItemType("Car"), price).build();
    }

    public static OrderDetails CreateCarOrderDetails(Price price, int quantity, Price newPrice) {
        return new OrderDetails.OrderDetailsBuilder(TestUtils.createCar(price)).quantity(quantity).newPrice(newPrice).build();
    }

    public static Order createOrder(List<OrderDetails> orderDetails) {
        return new Order.OrderBuilder().details(orderDetails).build();
    }
}