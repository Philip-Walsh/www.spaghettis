// Cypress Navigation Tests for Spaghetti's Ramen App

describe('🍜 Navigation Testing', () => {
    beforeEach(() => {
        cy.waitForApplication();
    });

    describe('Top Navigation', () => {
        it('should have consistent navigation across pages', () => {
            // Test homepage navigation
            cy.visit('/');
            cy.verifyNavigationConsistency();

            // Navigate to About page
            cy.get('a[href="/about"]').click();
            cy.url().should('include', '/about');
            cy.verifyNavigationConsistency();

            // Navigate to Ramen page
            cy.get('a[href="/ramen"]').click();
            cy.url().should('include', '/ramen');
            cy.verifyNavigationConsistency();

            // Navigate back home via logo
            cy.get('a[href="/"], .nav-logo').first().click();
            cy.url().should('match', /\/$|\/index/);
        });

        it('should toggle theme correctly', () => {
            cy.testThemeToggle();

            // Verify theme persists across navigation
            cy.get('a[href="/ramen"]').click();
            cy.get('html, body').should('have.class', 'dark').or('have.attr', 'data-theme', 'dark');
        });

        it('should work on mobile devices', () => {
            cy.testMobileNavigation();

            // Click a menu item
            cy.get('.nav-links a[href="/ramen"]').click();
            cy.url().should('include', '/ramen');

            // Verify mobile menu closes after navigation
            cy.get('.nav-links.open').should('not.exist');
        });
    });

    describe('Ramen Builder Step Navigation', () => {
        beforeEach(() => {
            cy.navigateToRamenBuilder();
        });

        it('should navigate through steps correctly', () => {
            // Start at first step
            cy.verifyStepActive('Choose Your Base');

            // Navigate to protein step
            cy.navigateToStep('protein');
            cy.verifyStepActive('Select Protein');

            // Navigate to vegetables step
            cy.navigateToStep('gardenPicks');
            cy.verifyStepActive('Add Vegetables');

            // Navigate to broth step
            cy.navigateToStep('sauceBroth');
            cy.verifyStepActive('Pick Your Broth');

            // Navigate to garnish step
            cy.navigateToStep('garnish');
            cy.verifyStepActive('Final Touches');
        });

        it('should preserve selections when navigating between steps', () => {
            // Select noodle base
            cy.selectNoodleBase('Forbidden Ramen');
            cy.verifyOptionSelected('Forbidden Ramen');

            // Navigate to protein step and select
            cy.navigateToStep('protein');
            cy.selectProtein('Tofu');
            cy.verifyOptionSelected('Tofu');

            // Navigate back to noodle base
            cy.navigateToStep('noodleBase');
            cy.verifyOptionSelected('Forbidden Ramen');

            // Navigate back to protein
            cy.navigateToStep('protein');
            cy.verifyOptionSelected('Tofu');
        });

        it('should update price as selections are made', () => {
            // Select noodle base
            cy.selectNoodleBase('Forbidden Ramen');
            cy.verifyTotalPriceUpdated();

            // Add protein
            cy.navigateToStep('protein');
            cy.selectProtein('Chicken');
            cy.verifyTotalPriceUpdated();

            // Add broth
            cy.navigateToStep('sauceBroth');
            cy.selectBroth('Miso');
            cy.verifyTotalPriceUpdated();
        });

        it('should allow multiple protein selections', () => {
            cy.navigateToStep('protein');

            // Select multiple proteins
            cy.selectProtein('Chicken');
            cy.selectProtein('Tofu');

            // Verify both are selected
            cy.verifyOptionSelected('Chicken');
            cy.verifyOptionSelected('Tofu');
        });

        it('should complete order and add to cart', () => {
            // Build a complete ramen
            cy.selectNoodleBase('Forbidden Ramen');

            cy.navigateToStep('protein');
            cy.selectProtein('Tofu');

            cy.navigateToStep('sauceBroth');
            cy.selectBroth('Miso');

            // Add to cart
            cy.get('button:contains("Add to Cart"), button:contains("Finish")').click();

            // Verify cart has items
            cy.verifyCartHasItems();
        });
    });

    describe('Navigation Performance', () => {
        beforeEach(() => {
            cy.navigateToRamenBuilder();
        });

        it('should navigate between steps quickly', () => {
            const steps = ['protein', 'gardenPicks', 'sauceBroth', 'garnish', 'noodleBase'];

            steps.forEach((step, index) => {
                cy.measureNavigationTime(index === 0 ? 'noodleBase' : steps[index - 1], step);
            });
        });

        it('should handle rapid navigation without issues', () => {
            // Rapidly navigate between steps
            for (let i = 0; i < 3; i++) {
                cy.navigateToStep('protein');
                cy.wait(100);
                cy.navigateToStep('sauceBroth');
                cy.wait(100);
                cy.navigateToStep('noodleBase');
                cy.wait(100);
            }

            // Verify final state is consistent
            cy.verifyStepActive('Choose Your Base');
        });
    });

    describe('Navigation Accessibility', () => {
        it('should be accessible via keyboard', () => {
            cy.navigateToRamenBuilder();

            // Test keyboard navigation
            cy.get('body').tab();
            cy.focused().should('be.visible');

            // Navigate through step navigation with keyboard
            cy.get('[role="tab"], button[aria-controls]').first().focus();
            cy.focused().type('{enter}');

            // Verify navigation worked
            cy.url().should('include', '/ramen');
        });

        it('should have proper ARIA labels', () => {
            cy.navigateToRamenBuilder();
            cy.checkAccessibility();

            // Check step navigation has proper ARIA
            cy.get('[role="tab"], [aria-current="step"]').should('exist');
        });
    });

    describe('Edge Cases', () => {
        it('should handle direct URL access to ramen builder', () => {
            cy.visit('/ramen');
            cy.get('body').should('be.visible');
            cy.verifyStepActive('Choose Your Base');
        });

        it('should handle browser back/forward navigation', () => {
            cy.visit('/');
            cy.get('a[href="/ramen"]').click();

            // Use browser back
            cy.go('back');
            cy.url().should('not.include', '/ramen');

            // Use browser forward
            cy.go('forward');
            cy.url().should('include', '/ramen');
        });

        it('should handle invalid navigation gracefully', () => {
            cy.navigateToRamenBuilder();

            // Try to access non-existent step (should handle gracefully)
            cy.window().then((win) => {
                // Simulate programmatic navigation to invalid state
                win.history.pushState({}, '', '/ramen#invalid-step');
            });

            // App should still be functional
            cy.get('body').should('be.visible');
            cy.selectNoodleBase('Forbidden Ramen');
        });
    });
});
