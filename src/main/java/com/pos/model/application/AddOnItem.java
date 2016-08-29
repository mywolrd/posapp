package com.pos.model.application;

import java.time.LocalDateTime;

import com.google.common.base.Objects;

public class AddOnItem {

    private long id;
    private String name;
    private Price price;
    private boolean active;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private AddOnItem(AddOnItemBuilder builder) {
        this.id = builder.id;
        this.name = builder.name;
        this.price = builder.price;
        this.active = builder.active;

        this.createdAt = builder.createdAt;
        this.updatedAt = builder.updatedAt;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(this.id, this.name, this.price, this.active);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        AddOnItem other = (AddOnItem) obj;
        return Objects.equal(this.id, other.id)
                && Objects.equal(this.name, other.name)
                && Objects.equal(this.price, other.price)
                && Objects.equal(this.active, other.active);
    }

    public static class AddOnItemBuilder {
        private long id;
        private String name;
        private Price price;
        private boolean active;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public AddOnItemBuilder(String name, Price price) {
            this.name = name;
            this.price = price;
        }

        public AddOnItemBuilder id(long id) {
            this.id = id;
            return this;
        }

        public AddOnItemBuilder active(boolean active) {
            this.active = active;
            return this;
        }

        public AddOnItemBuilder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public AddOnItemBuilder updatedAt(LocalDateTime updatedAt) {
            this.updatedAt = updatedAt;
            return this;
        }

        public AddOnItem build() {
            return new AddOnItem(this);
        }
    }
}