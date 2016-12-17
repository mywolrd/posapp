package com.pos.model.web;

import com.pos.model.persist.Price;

public class W_OrderDetailAddonItem {

    private long id;
    private long addonItemId;
    private long orderDetailsId;
    private Price newPrice;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getAddonItemId() {
        return addonItemId;
    }

    public void setAddonItemId(long addonItemId) {
        this.addonItemId = addonItemId;
    }

    public long getOrderDetailsId() {
        return orderDetailsId;
    }

    public void setOrderDetailsId(long orderDetailsId) {
        this.orderDetailsId = orderDetailsId;
    }

    public Price getNewPrice() {
        return newPrice;
    }

    public void setNewPrice(Price newPrice) {
        this.newPrice = newPrice;
    }
}