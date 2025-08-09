Feature: Navigation Consistency and Step Navigation
  As a customer using the ramen builder
  I want the navigation to work correctly and consistently
  So that I can navigate through the app without issues

  Background:
    Given the application is running at the deployed URL

  @Navigation @StepNavigation
  Scenario: Step navigation should update correctly in the ramen builder
    Given I am on the ramen builder page
    When I navigate to step "protein" using step navigation
    Then the current step should be "protein"
    And the navigation should show "protein" as active
    And the URL should reflect the current step

  @Navigation @StepNavigation
  Scenario: Step navigation should persist selections when navigating back and forth
    Given I am on the ramen builder page
    When I select "Forbidden Ramen" as noodle base
    And I navigate to step "protein" using step navigation
    And I select "Tofu" as protein
    And I navigate back to step "noodleBase" using step navigation
    Then I should still see "Forbidden Ramen" selected
    When I navigate forward to step "protein" using step navigation
    Then I should still see "Tofu" selected

  @Navigation @StepNavigation
  Scenario: Navigation should prevent skipping required steps
    Given I am on the ramen builder page
    When I try to navigate to step "garnish" without completing required steps
    Then I should be prevented from navigating to that step
    Or I should see a validation message about required steps

  @Navigation @TopNavigation
  Scenario: Top navigation should remain consistent across pages
    Given I am on the homepage
    When I navigate to the "About" page
    Then the navigation menu should display the same items as the homepage
    And the theme toggle should be visible
    When I navigate to the "Ramen" page
    Then the navigation menu should display the same items as before
    And the theme toggle should be visible

  @Navigation @TopNavigation
  Scenario: Navigation links should work correctly
    Given I am on the homepage
    When I click on the "Ramen" navigation link
    Then I should be on the ramen builder page
    When I click on the "About" navigation link
    Then I should be on the about page
    When I click on the home logo
    Then I should be on the homepage

  @Navigation @MobileNavigation
  Scenario: Mobile navigation menu should function correctly
    Given I am on the homepage with mobile viewport
    When I click the mobile menu toggle
    Then the mobile navigation menu should open
    When I click on "Ramen" in the mobile menu
    Then I should be on the ramen builder page
    And the mobile menu should close

  @Navigation @ThemeToggle
  Scenario: Theme toggle should work correctly across navigation
    Given I am on the homepage
    When I toggle the theme to dark mode
    Then the page should display in dark mode
    When I navigate to the "Ramen" page
    Then the page should still display in dark mode
    When I navigate back to the homepage
    Then the page should still display in dark mode

  @Navigation @StepNavigation @EdgeCase
  Scenario: Navigation should handle direct step access gracefully
    Given I am on the ramen builder page
    When I directly navigate to step "garnish" via step navigation
    Then the application should handle this gracefully
    And should show appropriate guidance or redirect to first step

  @Navigation @StepNavigation @Accessibility
  Scenario: Step navigation should be accessible
    Given I am on the ramen builder page
    When I use keyboard navigation to move through steps
    Then each step should be focusable
    And should have appropriate aria labels
    And screen reader announcements should be clear

  @Navigation @StepNavigation @Performance
  Scenario: Step navigation should be performant
    Given I am on the ramen builder page
    When I rapidly navigate between different steps
    Then each navigation should complete within 500ms
    And there should be no visual glitches or delays
    And the UI should remain responsive
