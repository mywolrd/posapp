package com.pos.model.application;

import java.time.LocalDateTime;
import java.util.List;

import com.google.common.base.Objects;
import com.pos.utils.Utils;

public class Order {

    private long id;
    private Customer customer;
    private List<OrderDetails> details;
    private LocalDateTime dropDate;
    private LocalDateTime readyDate;
    private LocalDateTime pickupDate;

    public static class OrderBuilder {

        private long id;
        private List<OrderDetails> details;
        private LocalDateTime dropDate;
        private LocalDateTime readyDate;
        private LocalDateTime pickupDate;
        private Customer customer;

        public OrderBuilder customer(Customer customer) {
            this.customer = customer;
            return this;
        }

        public OrderBuilder details(List<OrderDetails> details) {
            this.details = details;
            return this;
        }

        public OrderBuilder dropDate(LocalDateTime dropDate) {
            this.dropDate = dropDate;
            return this;
        }

        public OrderBuilder readyDate(LocalDateTime readyDate) {
            this.readyDate = readyDate;
            return this;
        }

        public OrderBuilder pickupDate(LocalDateTime pickupDate) {
            this.pickupDate = pickupDate;
            return this;
        }

        public Order build() {
            return new Order(this);
        }
    }

    private Order(OrderBuilder builder) {
        this.id = builder.id;
        this.details = builder.details;
        this.dropDate = builder.dropDate;
        this.readyDate = builder.readyDate;
        this.pickupDate = builder.pickupDate;
        this.customer = builder.customer;
    }

    public long getId() {
        return id;
    }

    public Customer getCustomer() {
        return customer;
    }

    public List<OrderDetails> getDetails() {
        return details;
    }

    public LocalDateTime getDropDate() {
        return dropDate;
    }

    public LocalDateTime getReadyDate() {
        return readyDate;
    }

    public LocalDateTime getPickupDate() {
        return pickupDate;
    }

    public Price getTotalAmount() {
        Price total = Price.nothing();
        for (OrderDetails orderDetails : this.details) {
            total = Price.add(total, orderDetails.getSubtotal());
        }
        return total;
    }

    public int getTotalQuantity() {
        int quantity = Utils.ZERO;
        for (OrderDetails orderDetails : this.details) {
            quantity += orderDetails.getQuantity();
        }
        return quantity;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((details == null) ? 0 : details.hashCode());
        result = prime * result + ((dropDate == null) ? 0 : dropDate.hashCode());
        result = prime * result + (int) (id ^ (id >>> 32));
        result = prime * result + ((readyDate == null) ? 0 : readyDate.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Order other = (Order) obj;
        return Objects.equal(this.id, other.id) && Objects.equal(this.details, other.details) && Objects.equal(this.dropDate, other.dropDate)
                && Objects.equal(this.readyDate, this.readyDate);
    }
}