# Assumptions and Decisions Made

## 1. Create a Validate JWT Endpoint as Part of the Login Mechanism
**Description:**
- Implemented an endpoint to validate JSON Web Tokens (JWT) during the login process.

**Reasoning:**
- **Security:** JWTs are a secure way to transmit information between parties because they can be signed, ensuring the integrity and authenticity of the data.
- **Efficiency:** This eliminates the need to ask the user to sign the onboarding message repeatedly, thus helping to improve the user experience.

## 2. Setup Pagination
**Description:**
- Added pagination to handle large sets of data in API responses.

**Reasoning:**
- **Performance:** Pagination helps to reduce the load on the server by limiting the number of records returned in a single response.
- **User Experience:** It enhances user experience by allowing users to navigate through data more easily without overwhelming them with too much information at once.

## 3. Use Alchemy RPC Provider for Token Balance and Metadata
**Description:**
- Utilized Alchemy RPC provider to fetch token balance and metadata.

**Reasoning:**
- **Reliability:** Alchemy is a reputable provider known for its reliable and high-performance infrastructure.
- **Ease of Use:** It offers robust APIs that simplify the process of interacting with Ethereum nodes, making it easier to fetch accurate token data.

## 4. Use Redis as Caching Service
**Description:**
- Integrated Redis as the caching service for the application.

**Reasoning:**
- **Performance:** Redis significantly improves application performance by caching frequently accessed data, reducing database load and latency.
- **Scalability:** It supports various data structures and can handle large volumes of data, making it ideal for high-performance caching needs.

## 5. Support Only Ethereum, Sepolia, and Arbitrum in the First Release
**Description:**
- Limited the initial release to support Ethereum, Sepolia, and Arbitrum networks.

**Reasoning:**
- **Focus:** Focusing on a few networks allows for thorough testing and optimization, ensuring a stable initial release.
- **User Demand:** These networks were chosen based on current user demand and their relevance in the blockchain ecosystem.

## 6. Reuse Theme from Jumper Exchange Frontend
**Description:**
- Reused the existing theme from the Jumper Exchange frontend.

**Reasoning:**
- **Consistency:** Using a consistent theme helps maintain a uniform user interface and user experience across applications.
- **Efficiency:** It saves development time by leveraging pre-existing design assets and styles.

## 7. Centralized Errors
**Description:**
- Implemented a centralized error-handling mechanism.

**Reasoning:**
- **Maintainability:** Centralized error handling makes it easier to manage and debug errors, leading to more maintainable code.
- **Consistency:** It ensures that errors are handled uniformly throughout the application, providing a consistent user experience.

## 8. Use TypeORM for Loosely Coupled Components in the Data Layer of Backend
**Description:**
- Adopted TypeORM as the Object-Relational Mapper (ORM) for the backend data layer.

**Reasoning:**
- **Flexibility:** TypeORM supports multiple database systems and provides a high level of abstraction, making it easier to switch databases if needed.
- **Productivity:** It simplifies database interactions, reduces boilerplate code, and improves development speed with features like migrations, decorators, and more.
