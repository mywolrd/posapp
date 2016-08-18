package com.pos.dao.jdbc.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.time.LocalDateTime;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import com.pos.dao.jdbc.DBNames;
import com.pos.model.application.Customer;
import com.pos.model.application.Customer.CustomerBuilder;

@Component
public class CustomerRowMapper implements RowMapper<Customer> {

    @Override
    public Customer mapRow(ResultSet rs, int rowNum) throws SQLException {
        Timestamp t_createdat = rs.getTimestamp(DBNames.CREATEDAT);
        Timestamp t_updatedat = rs.getTimestamp(DBNames.UPDATEDAT);

        LocalDateTime createdAt = t_createdat == null ? null : t_createdat.toLocalDateTime();
        LocalDateTime updatedAt = t_updatedat == null ? null : t_updatedat.toLocalDateTime();

        Customer customer = new CustomerBuilder(rs.getString(DBNames.LASTNAME)).id(rs.getLong(DBNames.ID)).firstName(rs.getString(DBNames.FIRSTNAME))
                .number(rs.getString(DBNames.PNUMBER)).createdAt(createdAt).updatedAt(updatedAt).build();

        return customer;
    }

}