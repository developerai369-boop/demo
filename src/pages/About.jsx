import React from 'react';
import Layout from '../components/Layout';

export default function About() {
  return (
    <Layout>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Our Story</span>
          <h1>About LaptopHub</h1>
        </div>
      </section>

      <section>
        <div className="container about-split">
          <div className="about-img">
            <div className="product-visual product-visual--macbook">
              <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="14" width="44" height="28" rx="2.5" fill="#fff" fillOpacity="0.92"/>
                <rect x="13" y="17" width="38" height="22" rx="1" fill="#0F172A" fillOpacity="0.85"/>
                <path d="M6 46h52l3 6a2 2 0 0 1-2 3H5a2 2 0 0 1-2-3l3-6z" fill="#fff" fillOpacity="0.92"/>
                <rect x="27" y="49" width="10" height="1.6" rx="0.8" fill="#0F172A" fillOpacity="0.3"/>
              </svg>
            </div>
          </div>
          <div className="about-copy">
            <span className="eyebrow">Grand Opening 2026</span>
            <h2>A brand-new store, built with trust</h2>
            <p>LaptopHub just opened its doors this year, built on a simple idea: sell only genuine laptops we'd be proud to use ourselves, at fair prices.</p>
            <p>Every product we sell is sourced directly from authorized distributors and comes with full manufacturer warranty. We're just getting started, and we're building this store around our customers.</p>
            <ul className="about-list">
              <li>100% genuine, authorized products</li>
              <li>Full manufacturer warranty included</li>
              <li>Transparent pricing, no hidden fees</li>
              <li>A team that actually knows the specs</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="why">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Our Journey</span>
            <h2>How We Got Here</h2>
          </div>
          <div className="timeline">
            <div className="timeline-item">
              <strong>Early 2026</strong>
              <div><h4>The Idea</h4><p>A small team of tech enthusiasts started planning a laptop store built on trust.</p></div>
            </div>
            <div className="timeline-item">
              <strong>Spring 2026</strong>
              <div><h4>Building Supplier Relationships</h4><p>We partnered directly with Apple, Dell, ASUS, Lenovo, and HP distributors.</p></div>
            </div>
            <div className="timeline-item">
              <strong>June 2026</strong>
              <div><h4>Getting Ready</h4><p>Set up our warehouse, warranty process, and support team ahead of launch.</p></div>
            </div>
            <div className="timeline-item">
              <strong>Today</strong>
              <div><h4>Grand Opening</h4><p>LaptopHub is officially open — come be part of our story from day one.</p></div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
