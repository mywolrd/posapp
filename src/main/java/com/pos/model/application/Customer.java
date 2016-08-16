package com.pos.model.application;

public class Customer {

    private long id;
    private String firstName;
    private String lastName;
    private String number;

    private Customer(CustomerBuilder builder) {
        this.firstName = builder.firstName;
        this.lastName = builder.lastName;
        this.number = builder.number;
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

    public static class CustomerBuilder {

        private String firstName;
        private String lastName;
        private String number;

        public CustomerBuilder(String lastName) {
            this.lastName = lastName;
        }

        public CustomerBuilder firstName(String firstName) {
            this.firstName = firstName;
            return this;
        }

        public CustomerBuilder number(String number) {
            this.number = number;
            return this;
        }

        public Customer build() {
            return new Customer(this);
        }
    }
}