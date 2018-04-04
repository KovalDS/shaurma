package com.epam.rd.shaurmastore.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A OrderEntry.
 */
@Entity
@Table(name = "order_entry")
public class OrderEntry implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "price", precision=10, scale=2)
    private BigDecimal price;

    @ManyToOne
    private ProductOrder productOrder;

    @OneToMany(mappedBy = "orderEntry")
    @JsonIgnore
    private Set<Product> products = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public OrderEntry quantity(Integer quantity) {
        this.quantity = quantity;
        return this;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public OrderEntry price(BigDecimal price) {
        this.price = price;
        return this;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public ProductOrder getProductOrder() {
        return productOrder;
    }

    public OrderEntry productOrder(ProductOrder productOrder) {
        this.productOrder = productOrder;
        return this;
    }

    public void setProductOrder(ProductOrder productOrder) {
        this.productOrder = productOrder;
    }

    public Set<Product> getProducts() {
        return products;
    }

    public OrderEntry products(Set<Product> products) {
        this.products = products;
        return this;
    }

    public OrderEntry addProducts(Product product) {
        this.products.add(product);
        product.setOrderEntry(this);
        return this;
    }

    public OrderEntry removeProducts(Product product) {
        this.products.remove(product);
        product.setOrderEntry(null);
        return this;
    }

    public void setProducts(Set<Product> products) {
        this.products = products;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        OrderEntry orderEntry = (OrderEntry) o;
        if (orderEntry.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), orderEntry.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "OrderEntry{" +
            "id=" + getId() +
            ", quantity=" + getQuantity() +
            ", price=" + getPrice() +
            "}";
    }
}
