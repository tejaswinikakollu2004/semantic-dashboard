# Semantic HTML5 & Accessible Component Architecture

## Project Overview

This project demonstrates the structural foundation of an enterprise dashboard using semantic HTML5 and accessible web development practices.

The dashboard is designed with a clear and structured DOM hierarchy and follows accessibility principles based on WCAG guidelines.

## Features

* Semantic HTML5 structure
* Accessible navigation
* Dashboard sidebar
* Multiple pages
* User management section
* Reports section
* Accessible data tables
* Accessible forms
* Native form validation
* Accessible modal dialog
* Keyboard navigation support
* Responsive layout
* W3C HTML validation

## Project Structure

```text
semantic-dashboard/
│
├── components/
│   ├── header.html
│   ├── modal.html
│   └── sidebar.html
│
├── css/
│   └── style.css
│
├── pages/
│   ├── reports.html
│   └── users.html
│
├── index.html
└── README.md
```

## Semantic HTML Elements Used

The project uses the following semantic HTML5 elements:

* `<header>` — Page header and main navigation
* `<nav>` — Navigation menus
* `<aside>` — Sidebar navigation
* `<main>` — Primary page content
* `<section>` — Logical content sections
* `<article>` — Individual statistics cards
* `<footer>` — Footer information
* `<table>` — Structured tabular data
* `<form>` — User input forms
* `<fieldset>` and `<legend>` — Grouped form controls
* `<dialog>` — Confirmation modal

## Accessibility Features

The dashboard includes:

* Descriptive page titles
* Proper heading hierarchy
* Accessible navigation labels
* `aria-label` and `aria-labelledby` attributes
* `aria-current="page"` for the active page
* Proper `<label>` elements for form controls
* Required form fields
* Native HTML form validation
* Table captions
* Table header scope attributes
* Visible keyboard focus indicators
* Keyboard-accessible buttons and links
* Accessible dialog labels and descriptions

## Pages

### Dashboard

The main dashboard displays:

* Dashboard overview
* User statistics
* Recent users
* Add user form
* User action confirmation dialog

### Users

The Users page provides:

* User management information
* Registered user table
* Add new user form

### Reports

The Reports page provides:

* Report statistics
* Recent reports table
* Report request form

## Validation

All main HTML pages were validated using the W3C Markup Validation Service.

Validation status:

* `index.html` — No errors
* `pages/users.html` — No errors
* `pages/reports.html` — No errors

## Technologies Used

* HTML5
* CSS3
* WCAG Accessibility Principles
* W3C HTML Validation

## Author

Developed as part of an internship task on Semantic HTML5 and Accessible Component Architecture.
