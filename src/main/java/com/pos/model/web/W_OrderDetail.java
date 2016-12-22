package com.pos.model.web;

import java.util.List;

import com.pos.model.persist.Price;

public class W_OrderDetail {

    private long id;
    private long itemId;
    private List<W_OrderDetailAddonItem> orderDetailAddonItems;
    private Price newPrice;
    private int quantity;
    private boolean active;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getItemId() {
        return itemId;
    }

    public void setItemId(long itemId) {
        this.itemId = itemId;
    }

    public List<W_OrderDetailAddonItem> getOrderDetailAddonItems() {
        return orderDetailAddonItems;
    }

    public void setOrderDetailAddonItems(
            List<W_OrderDetailAddonItem> orderDetailAddonItems) {
        this.orderDetailAddonItems = orderDetailAddonItems;
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

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}