package com.pos.model.web;

import com.pos.model.persist.Price;

public class W_OrderDetailAddonItem {

    private long id;
    private long addonItemId;

    private Price newPrice;
    private boolean active;

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

    public Price getNewPrice() {
        return newPrice;
    }

    public void setNewPrice(Price newPrice) {
        this.newPrice = newPrice;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

}