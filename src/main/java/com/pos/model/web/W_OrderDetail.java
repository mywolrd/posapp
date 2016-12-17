package com.pos.model.web;

import java.util.List;

import com.pos.model.persist.Item;
import com.pos.model.persist.OrderDetailAddonItem;
import com.pos.model.persist.Price;

public class W_OrderDetail {

    private long id;
    private long orderId;
    private List<OrderDetailAddonItem> addonItems;
    private Price newPrice;
    private int quantity;
    private Item item;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getOrderId() {
        return orderId;
    }

    public void setOrderId(long orderId) {
        this.orderId = orderId;
    }

    public List<OrderDetailAddonItem> getAddonItems() {
        return addonItems;
    }

    public void setAddonItems(List<OrderDetailAddonItem> addonItems) {
        this.addonItems = addonItems;
    }

    public Price getNewPrice() {
        return newPrice;
    }

    public void setNewPrice(Price newPrice) {
        this.newPrice = newPrice;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }
}