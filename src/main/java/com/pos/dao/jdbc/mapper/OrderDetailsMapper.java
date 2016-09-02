package com.pos.dao.jdbc.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.pos.model.application.OrderDetails;

public class OrderDetailsMapper implements RowMapper<OrderDetails> {

    @Override
    public OrderDetails mapRow(ResultSet rs, int rowNum) throws SQLException {
        // TODO Auto-generated method stub
        return null;
    }

}