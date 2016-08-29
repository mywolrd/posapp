package com.pos.model.application;

import java.time.LocalDateTime;

import com.google.common.base.Objects;

public class Customer {

    private long id;
    private String firstName;
    private String lastName;
    private String number;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private Customer(CustomerBuilder builder) {
        this.id = builder.id;
        this.firstName = builder.firstName;
        this.lastName = builder.lastName;
        this.number = builder.number;
        this.createdAt = builder.createdAt;
        this.updatedAt = builder.updatedAt;
    }

    public long getId() {
        return this.id;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public String getLastName() {
        return this.lastName;
    }

    public String getNumber() {
        return this.number;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(this.id, this.firstName, this.lastName,
                this.number);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (null == obj)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Customer other = (Customer) obj;
        return Objects.equal(this.id, other.id)
                && Objects.equal(this.lastName, other.lastName)
                && Objects.equal(this.firstName, other.firstName)
                && Objects.equal(this.number, other.number);
    }

    public static class CustomerBuilder {

        private long id;
        private String firstName;
        private String lastName;
        private String number;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public CustomerBuilder(String lastName) {
            this.lastName = lastName;
        }

        public CustomerBuilder id(long id) {
            this.id = id;
            return this;
        }

        public CustomerBuilder firstName(String firstName) {
            this.firstName = firstName;
            return this;
        }

        public CustomerBuilder number(String number) {
            this.number = number;
            return this;
        }

        public CustomerBuilder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public CustomerBuilder updatedAt(LocalDateTime updatedAt) {
            this.updatedAt = updatedAt;
            return this;
        }

        public Customer build() {
            return new Customer(this);
        }
    }
}