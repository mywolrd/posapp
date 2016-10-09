package com.pos.utils;

import java.util.List;

import com.pos.model.application.Item;
import com.pos.model.application.ItemType;
import com.pos.model.application.Order;
import com.pos.model.application.OrderDetails;
import com.pos.model.application.Price;

public class TestUtils {

    public static ItemType createItemType(String name) {
        return new ItemType(0L, name, 0, true);
    }

    public static Item createItem(long itemTypeId, String itemName,
            Price price) {
        return new Item.ItemBuilder(itemTypeId, price).name(itemName).build();
    }

    public static Price createPrice(int dollar, int cent) {
        return new Price.PriceBuilder().dollar(dollar).cent(cent).build();
    }

    public static OrderDetails createOrderDetails(Item item, int quantity,
            Price newPrice) {
        return new OrderDetails.OrderDetailsBuilder(item).quantity(quantity)
                .newPrice(newPrice).build();
    }

    public static Item createCar(long itemTypeId, Price price) {
        return new Item.ItemBuilder(itemTypeId, price).build();
    }

    public static OrderDetails CreateCarOrderDetails(long itemTypeId,
            Price price, int quantity, Price newPrice) {
        return new OrderDetails.OrderDetailsBuilder(
                TestUtils.createCar(itemTypeId, price)).quantity(quantity)
                        .newPrice(newPrice).build();
    }

    public static Order createOrder(List<OrderDetails> orderDetails) {
        return new Order.OrderBuilder().details(orderDetails).build();
    }
}