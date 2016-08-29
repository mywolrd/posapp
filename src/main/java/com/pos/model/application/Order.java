package com.pos.model.application;

import java.time.LocalDateTime;
import java.util.List;

import com.google.common.base.Objects;

public class Order {

    private long id;
    private Customer customer;
    private boolean completed;
    private boolean voided;
    private List<OrderDetails> details;
    private LocalDateTime dropDate;
    private LocalDateTime readyDate;
    private LocalDateTime pickupDate;

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

    public boolean isCompleted() {
        return this.completed;
    }

    public boolean isVoided() {
        return this.voided;
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

    @Override
    public int hashCode() {
        return Objects.hashCode(this.id, this.customer, this.completed,
                this.voided, this.dropDate, this.pickupDate, this.pickupDate,
                this.details);
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
        return Objects.equal(this.id, other.id)
                && Objects.equal(this.details, other.details)
                && Objects.equal(this.customer, other.customer)
                && Objects.equal(this.completed, other.completed)
                && Objects.equal(this.voided, other.voided)
                && Objects.equal(this.dropDate, other.dropDate)
                && Objects.equal(this.readyDate, this.readyDate);
    }

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

}