package com.pos.dao.jdbc;

import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import com.pos.dao.CustomerDao;
import com.pos.dao.jdbc.mapper.CustomerRowMapper;
import com.pos.model.application.Customer;
import com.pos.model.parameter.CustomerParameter;
import com.pos.model.parameter.SearchParameter;

@Repository
public class JdbcCustomerDao extends JdbcBaseDao implements CustomerDao {

    private final static String listByLastName = "SELECT * from CUSTOMERS where CUSTOMER.lastName like :lastName";
    private final static String save = "INSERT into CUSTOMERS (lastName, firstName, pnumber, createdAt) values (:lastName, :firstName, :number, now()) ";
    private final static String update = "UPDATE CUSTOMERS set lastName = :lastName, firstName = :firstName, pnumber = :number, updatedAt = now() where customers.id = :id";
    private final static String uniqueById = "SELECT * from CUSTOMERS where CUSTOMERS.id = :id";
    @Autowired
    private CustomerRowMapper rowMapper;

    @Override
    public long save(CustomerParameter info) {
        SqlParameterSource parameter = new MapSqlParameterSource().addValue(DBNames.LASTNAME, info.getLastName()).addValue(DBNames.FIRSTNAME, info.getFirstName())
                .addValue(DBNames.NUMBER, info.getPhoneNumber());
        try {
            KeyHolder holder = new GeneratedKeyHolder();
            this.namedParameterJdbcTemplate.update(save, parameter, holder);

            if (!holder.getKeyList().isEmpty()) {
                Integer id = (Integer) holder.getKeyList().get(0).get(DBNames.ID);
                return id;
            }
        } catch (DataAccessException e) {

        }
        return 0;
    }

    @Override
    public long update(CustomerParameter info) {
        SqlParameterSource parameter = new MapSqlParameterSource().addValue(DBNames.LASTNAME, info.getLastName()).addValue(DBNames.FIRSTNAME, info.getFirstName())
                .addValue(DBNames.NUMBER, info.getPhoneNumber());
        try {
            KeyHolder holder = new GeneratedKeyHolder();
            this.namedParameterJdbcTemplate.update(update, parameter, holder);

            if (!holder.getKeyList().isEmpty()) {
                Integer id = (Integer) holder.getKeyList().get(0).get(DBNames.ID);
                return id;
            }
        } catch (DataAccessException e) {

        }
        return 0;
    }

    @Override
    public List<Customer> search(SearchParameter parameter) {
        SqlParameterSource queryparameter = new MapSqlParameterSource().addValue(DBNames.LASTNAME, parameter.getParameterValue() + '%');
        try {
            return this.namedParameterJdbcTemplate.query(listByLastName, queryparameter, rowMapper);
        } catch (DataAccessException e) {
            return new LinkedList<Customer>();
        }
    }

    @Override
    public Customer uniqueById(long id) {
        SqlParameterSource parameter = new MapSqlParameterSource().addValue(DBNames.ID, id);
        try {
            return this.namedParameterJdbcTemplate.queryForObject(uniqueById, parameter, rowMapper);
        } catch (DataAccessException e) {
            return null;
        }
    }

}