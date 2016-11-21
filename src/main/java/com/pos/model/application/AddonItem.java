package com.pos.model.application;

import java.time.LocalDateTime;

import com.google.common.base.Objects;
import com.pos.model.parameter.AddonItemParameter;

public class AddonItem {

    private long id;
    private String name;
    private Price price;
    private boolean active;
    private int weight;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private AddonItem(AddonItemBuilder builder) {
        this.id = builder.id;
        this.name = builder.name;
        this.price = builder.price;
        this.active = builder.active;
        this.weight = builder.weight;

        this.createdAt = builder.createdAt;
        this.updatedAt = builder.updatedAt;
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Price getPrice() {
        return price;
    }

    public boolean isActive() {
        return active;
    }

    public int getWeight() {
        return weight;
    }

    @Override
    public String toString() {
        return new StringBuilder().append("AddonItem {").append(" id=" + id)
                .append(" name=" + name).append(" price=" + price.toString())
                .append(" active=" + active).append(" weight=" + weight)
                .toString();
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
        AddonItem other = (AddonItem) obj;
        return Objects.equal(this.id, other.id)
                && Objects.equal(this.name, other.name)
                && Objects.equal(this.weight, other.weight)
                && Objects.equal(this.price, other.price)
                && Objects.equal(this.active, other.active);
    }

    public static class AddonItemBuilder {
        private long id;
        private String name;
        private Price price;
        private int weight;
        private boolean active;

        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public AddonItemBuilder(AddonItemParameter item) {
            this.id = item.getId();
            this.name = item.getName();
            this.price = new Price.PriceBuilder().dollar(item.getDollar())
                    .cent(item.getCent()).build();
            this.weight = item.getWeight();
            this.active = item.isActive();
        }

        public AddonItemBuilder(AddonItem item) {
            this.id = item.getId();
            this.name = item.getName();
            this.price = item.getPrice();
            this.weight = item.getWeight();
            this.active = item.isActive();
        }

        public AddonItemBuilder(String name, Price price) {
            this.name = name;
            this.price = price;
        }

        public AddonItemBuilder id(long id) {
            this.id = id;
            return this;
        }

        public AddonItemBuilder weight(int weight) {
            this.weight = weight;
            return this;
        }

        public AddonItemBuilder active(boolean active) {
            this.active = active;
            return this;
        }

        public AddonItemBuilder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public AddonItemBuilder updatedAt(LocalDateTime updatedAt) {
            this.updatedAt = updatedAt;
            return this;
        }

        public AddonItem build() {
            return new AddonItem(this);
        }
    }
}