# **Backend Assessment**

## SYNOPSIS

A company is designing an application to create and manage to-dos in order to assist with everyday tasks and time management. You are required to write the backend that will allow you to create, update and retrieve these to-dos through the use of a RESTful HTTP API. In order to keep the scope small, you do not need to take users into account.

While we would prefer that you write the API in Scala or a functional programming language, any language is ultimately acceptable. Similarly, we prefer the database language to be MongoDB if possible, or any NoSQL language, but any database language will suffice.

You are given the functional specification and technical requirements of the API. The functional specification is the functionality that the frontend expects the backend API to be capable of performing. The technical requirements are the standards the backend must meet.

## FUNCTIONAL SPECIFICATION

1. **<span style="text-decoration:underline;">A user must be able to create (POST) a new to-do with a description, a priority and an optional deadline</span>**

    _The priority is a means to order the to-dos in a meaningful way, it is up to you to decide how to implement it. Please note that it is expected that universal standards are used for data where possible, especially with dates and identifiers._

2. **<span style="text-decoration:underline;">A user must be able to update (PATCH) an existing to-do</span>**

    _Keep in mind that not every field should necessarily be able to update. Restrict the route to only allow fields that make logical sense to update._

3. **<span style="text-decoration:underline;">A user must be able to delete an existing to-do</span>**
4. **<span style="text-decoration:underline;">A user must be able to retrieve (GET) all to-dos</span>**
5. **<span style="text-decoration:underline;">A user must be able to sort to-dos by priority or by deadline, both ascending and descending</span>**

    _This should add sorting by field to the route that is requested in point 4 via a URL parameter._

6. **<span style="text-decoration:underline;">A user must be able to paginate to-dos</span>**

    _The frontend may wish to pull in data in batches. This requires the backend to allow for pagination by adding an offset and limit URL parameter to the GET route._

7. **<span style="text-decoration:underline;">A user must be able to limit the fields returned</span>**

    _Not all data is required when data is displayed on the frontend. Therefore, a URL parameter that specifies which fields to return is useful for reducing the size of the response payload and general API optimization. Note that if the parameter is not selected, all fields should be returned._

8. **<span style="text-decoration:underline;">A user must be able to query to-dos by status</span>**

    _We do not expect you to create a complex query language. The only requirement is a URL parameter that limits the to-dos that return according to whether or not they are overdue._

## TECHNICAL REQUIREMENTS

1. **<span style="text-decoration:underline;">The API must conform to the standards and constraints of REST as closely as possible</span>**

    _Representational state transfer is the de facto standard of modern web service design. It is expected that your API conforms to it as closely as possible. At the very least, the API should be stateless, the routes should be structured around resources and avoid containing verbs. More complex functionality such as caching is not expected._

2. **<span style="text-decoration:underline;">The API must use JSON for requests and responses</span>**

    _While REST allows for other formats, we are enforcing the usage of JSON for requests and responses as it is the most common practice for REST APIs._

3. **<span style="text-decoration:underline;">The API must be asynchronous and non-blocking</span>**

    _The backend should run work in parallel where applicable, and at no point should any thread be blocked while waiting for a network request (e.g. a Database call) to return._

4. **<span style="text-decoration:underline;">The API should implement optimistic concurrency control</span>**

    _A potential scenario for any web application is when a user submits an update to a resource while another user is working on an update for the same resource. There needs to be a system in place to cater for this situation to prevent the corruption of data. In this case we expect you to implement optimistic concurrency control using ETags and the Last-Modified header._

5. **<span style="text-decoration:underline;">Frameworks are not allowed</span>**

    _While libraries to assist with the implementation of various aspects of the API is permitted (such as Akka-HTTP for Scala or WSGI for Python to implement the HTTP interface), using powerful frameworks to mitigate the need to completely implement any functionality yourself is not allowed as it undermines the point of the test._
