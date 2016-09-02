package com.pos.dao;

public interface OrdersDao {

    void update();

    void save();

    void uniqueById();

    void listByCustomerId();

}