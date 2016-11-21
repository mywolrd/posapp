package com.pos.model.application;

import com.google.common.base.Objects;
import com.pos.model.parameter.ItemTypeParameter;

public class ItemType {

    private long id;
    private String name;
    private int weight;
    private boolean active;

    public ItemType(long id, String name, int weight, boolean active) {
        /* TODO */
        /*
         * Probably need to bubble it up and log.
         * 
         */
        if (name == null)
            throw new RuntimeException("ItemType name cannot be null.");
        this.name = name;
        this.id = id;
        this.weight = weight;
        this.active = active;

    }

    private ItemType(ItemTypeBuilder builder) {
        this.name = builder.name;
        this.id = builder.id;
        this.weight = builder.weight;
        this.active = builder.active;
    }

    public String getName() {
        return this.name;
    }

    public long getId() {
        return this.id;
    }

    public int getWeight() {
        return this.weight;
    }

    public boolean isActive() {
        return this.active;
    }

    @Override
    public String toString() {
        return new StringBuilder().append("ItemType {").append(" id=" + id)
                .append(" name=" + name).append(" active=" + active)
                .append(" weight=" + weight).append(" }").toString();
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(this.name, this.id, this.weight, this.active);
    }

    public static class ItemTypeBuilder {
        private long id;
        private final String name;
        private int weight;
        private boolean active;

        public ItemTypeBuilder(String name) {
            this.name = name;
        }

        public ItemTypeBuilder(ItemTypeParameter itemType) {
            this.id = itemType.getId();
            this.name = itemType.getName();
            this.weight = itemType.getWeight();
            this.active = itemType.isActive();
        }

        public ItemTypeBuilder(ItemType itemType) {
            this.id = itemType.getId();
            this.name = itemType.getName();
            this.weight = itemType.getWeight();
            this.active = itemType.isActive();
        }

        public ItemTypeBuilder weight(int weight) {
            this.weight = weight;
            return this;
        }

        public ItemTypeBuilder active(boolean active) {
            this.active = active;
            return this;
        }

        public ItemTypeBuilder id(long id) {
            this.id = id;
            return this;
        }

        public ItemType build() {
            return new ItemType(this);
        }
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        ItemType other = (ItemType) obj;
        return Objects.equal(this.name, other.name)
                && Objects.equal(this.id, other.id)
                && Objects.equal(this.weight, other.weight)
                && Objects.equal(this.active, other.active);
    }
}