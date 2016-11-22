package com.pos.model.parameter;

public class OrderDetailParameter {

    private long id;
    private long itemId;
    private int quantity;
    private PriceParameter newPrice;
    private OrderDetailAddonItemParameter[] orderDetailAddonItems;
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

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public PriceParameter getNewPrice() {
        return newPrice;
    }

    public void setNewPrice(PriceParameter newPrice) {
        this.newPrice = newPrice;
    }

    public OrderDetailAddonItemParameter[] getOrderDetailAddonItems() {
        return orderDetailAddonItems;
    }

    public void setOrderDetailAddonItems(
            OrderDetailAddonItemParameter[] orderDetailAddonItems) {
        this.orderDetailAddonItems = orderDetailAddonItems;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}