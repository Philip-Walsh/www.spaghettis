Feature: Ramen Builder
  As a customer
  I want to build a custom ramen bowl
  So that I can order my preferred combination

  Background:
    Given I am on the ramen builder page

  @RamenBuilder @BasicFlow
  Scenario: Build a basic ramen bowl
    When I select "Forbidden Ramen" as noodle base
    And I select "Tofu" as protein
    And I select "Miso" as broth
    Then I should see the total price updated
    And I should see my selections in the cart

  @RamenBuilder @MultipleSelections
  Scenario: Add multiple proteins
    When I select "Forbidden Ramen" as noodle base
    And I select "Chicken" as protein
    And I select "Tofu" as protein
    Then I should see both proteins in my cart
    And the total should reflect both protein prices

  @RamenBuilder @StepNavigation
  Scenario: Navigate through ramen builder steps
    When I navigate to the protein step
    And I select "Chicken" as protein
    When I navigate to the broth step
    And I select "Miso" as broth
    When I navigate back to the noodle base step
    And I select "Forbidden Ramen" as noodle base
    Then all my selections should be preserved
    And I should be able to complete my order

  @RamenBuilder @NavigationValidation
  Scenario: Verify navigation state updates correctly
    When I select "Forbidden Ramen" as noodle base
    Then the noodle base step should be marked as completed
    When I navigate to the protein step
    Then the protein step should be marked as active
    And the noodle base step should remain completed

  @RamenBuilder @NavigationPersistence
  Scenario: Navigation should persist selections between steps
    Given I select "Forbidden Ramen" as noodle base
    When I navigate to the protein step
    And I select "Tofu" as protein
    When I navigate to the vegetables step
    And I select "Corn" as vegetable
    When I navigate back to the noodle base step
    Then "Forbidden Ramen" should still be selected
    When I navigate to the protein step
    Then "Tofu" should still be selected
    When I navigate to the vegetables step
    Then "Corn" should still be selected