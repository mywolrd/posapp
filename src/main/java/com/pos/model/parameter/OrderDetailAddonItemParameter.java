package com.pos.model.parameter;

public class OrderDetailAddonItemParameter {
    private long id;
    private long addonItemId;
    private long orderDetailId;
    private PriceParameter newPrice;
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

    public long getOrderDetailId() {
        return orderDetailId;
    }

    public void setOrderDetailId(long orderDetailId) {
        this.orderDetailId = orderDetailId;
    }

    public PriceParameter getNewPrice() {
        return newPrice;
    }

    public void setNewPrice(PriceParameter newPrice) {
        this.newPrice = newPrice;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

}