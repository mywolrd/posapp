package com.pos.model.application;

import com.google.common.base.Objects;
import com.pos.utils.Utils;

public class OrderDetails {

    private long id;
    private long orderId;
    private Price newPrice;
    private int quantity;
    private Item item;

    public static class OrderDetailsBuilder {

        private long id;
        private long orderId;
        private Price newPrice;
        private final Item item;
        private int quantity;

        public OrderDetailsBuilder(Item item) {
            this.item = item;
            this.quantity = 1;
            this.newPrice = null;
        }

        public OrderDetailsBuilder quantity(int quantity) {
            this.quantity = quantity;
            return this;
        }

        public OrderDetailsBuilder id(long id) {
            this.id = id;
            return this;
        }

        public OrderDetailsBuilder newPrice(Price newPrice) {
            this.newPrice = newPrice;
            return this;
        }

        public OrderDetailsBuilder orderId(long orderId) {
            this.orderId = orderId;
            return this;
        }

        public OrderDetails build() {
            return new OrderDetails(this);
        }
    }

    private OrderDetails(OrderDetailsBuilder builder) {
        this.id = builder.id;
        this.orderId = builder.orderId;
        this.newPrice = builder.newPrice;
        this.item = builder.item;
        this.quantity = builder.quantity;
    }

    public long getId() {
        return id;
    }

    public long getOrderId() {
        return orderId;
    }

    public Price getPrice() {
        if (null == newPrice) {
            return item.getPrice();
        }
        return newPrice;
    }

    public Price getSubtotal() {
        return Price.multiply(this.getPrice(), this.quantity);
    }

    public int getQuantity() {
        return this.quantity;
    }

    public Item getItem() {
        return this.item;
    }

    @Override
    public String toString() {
        //@formatter:off
        return Utils.lpad(Integer.toString(this.quantity), 3) + "  " 
                + Utils.rpad(this.item.getItemName(), 30) + "  "
                + Utils.rpad(this.getPrice().toString(), 6);
        //@formatter:on
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(this.id, this.quantity, this.orderId, this.newPrice, this.item);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        OrderDetails other = (OrderDetails) obj;

        return Objects.equal(other.id, this.id) && Objects.equal(other.quantity, this.quantity) && Objects.equal(other.orderId, this.orderId)
                && Objects.equal(other.getPrice(), this.getPrice()) && Objects.equal(other.item, this.item);
    }

}