import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../store/slices/ProductSlice";

export default function Products() {
  const { items, loading, error } = useSelector(
    (state) => state.Products
  );

  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    return items.filter((i) =>
      i.category.toLowerCase().includes(search.toLowerCase())
    );
  }, [items, search]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          {error}
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <div
          className="spinner-border text-primary"
          role="status"
        ></div>
        <h4 className="mt-3">Loading Products...</h4>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Products</h1>

      {/* Search */}
      <div className="row justify-content-center mb-4">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Category"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Products */}
      <div className="row g-4">
        {filteredProducts.map((k) => (
          <div
            className="col-sm-6 col-md-4 col-lg-3"
            key={k.itemid}
          >
            <div className="card h-100 shadow-sm">
              <img
                src={k.image}
                alt={k.itemname}
                className="card-img-top"
                style={{
                  height: "250px",
                  objectFit: "cover",
                }}
              />

              <div className="card-body">
                <span className="badge bg-secondary mb-2">
                  {k.category}
                </span>

                <h5 className="card-title">
                  {k.itemname}
                </h5>

                <h4 className="text-success">
                  ₹{k.price}
                </h4>

                <p className="text-muted">
                  Stock: {k.quantity}
                </p>
              </div>

              <div className="card-footer bg-white border-0">
                <button className="btn btn-primary w-100">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center mt-5">
          <h4>No Products Found</h4>
        </div>
      )}
    </div>
  );
}