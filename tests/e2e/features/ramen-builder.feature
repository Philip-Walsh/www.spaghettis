Feature: Ramen Builder
  As a customer
  I want to build a custom ramen bowl
  So that I can order my preferred combination

  Background:
    Given I am on the ramen builder page

  Scenario: Build a basic ramen bowl
    When I select "Forbidden Ramen" as noodle base
    And I select "Tofu" as protein
    And I select "Miso" as broth
    Then I should see the total price updated
    And I should see my selections in the cart

  Scenario: Add multiple proteins
    When I select "Forbidden Ramen" as noodle base
    And I select "Chicken" as protein
    And I select "Tofu" as protein
    Then I should see both proteins in my cart
    And the total should reflect both protein prices