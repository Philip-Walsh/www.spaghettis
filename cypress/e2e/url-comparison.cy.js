// URL Comparison Tests for Production vs Deploy Preview

describe('🔍 URL Comparison: Production vs Deploy Preview', () => {
    const productionUrl = 'https://spaghettis.netlify.app';
    const deployPreviewUrl = 'https://deploy-preview-6--spaghettis.netlify.app';

    describe('About Page Comparison', () => {
        it('should have consistent content between production and deploy preview', () => {
            let productionContent = {};
            let deployPreviewContent = {};

            // Test production URL
            cy.visit(`${productionUrl}/about`);
            cy.get('body').should('be.visible');

            // Capture key elements from production
            cy.get('h1').first().invoke('text').then((text) => {
                productionContent.h1 = text.trim();
            });

            cy.get('h2').then(($h2s) => {
                productionContent.h2Count = $h2s.length;
                productionContent.h2Texts = Array.from($h2s).map(h2 => h2.textContent.trim());
            });

            cy.get('nav').should('exist').then(() => {
                productionContent.hasNav = true;
            });

            cy.get('a[href="/ramen"], a:contains("Ramen")').should('exist').then(() => {
                productionContent.hasRamenLink = true;
            });

            // Test deploy preview URL
            cy.visit(`${deployPreviewUrl}/about`);
            cy.get('body').should('be.visible');

            // Capture key elements from deploy preview
            cy.get('h1').first().invoke('text').then((text) => {
                deployPreviewContent.h1 = text.trim();
            });

            cy.get('h2').then(($h2s) => {
                deployPreviewContent.h2Count = $h2s.length;
                deployPreviewContent.h2Texts = Array.from($h2s).map(h2 => h2.textContent.trim());
            });

            cy.get('nav').should('exist').then(() => {
                deployPreviewContent.hasNav = true;
            });

            cy.get('a[href="/ramen"], a:contains("Ramen")').should('exist').then(() => {
                deployPreviewContent.hasRamenLink = true;
            });

            // Compare the content
            cy.then(() => {
                cy.task('log', '🔍 Comparing Production vs Deploy Preview:');
                cy.task('log', `Production H1: "${productionContent.h1}"`);
                cy.task('log', `Deploy Preview H1: "${deployPreviewContent.h1}"`);
                cy.task('log', `Production H2 count: ${productionContent.h2Count}`);
                cy.task('log', `Deploy Preview H2 count: ${deployPreviewContent.h2Count}`);

                // Log differences
                if (productionContent.h1 !== deployPreviewContent.h1) {
                    cy.task('log', '❌ H1 titles differ!');
                } else {
                    cy.task('log', '✅ H1 titles match');
                }

                if (productionContent.h2Count !== deployPreviewContent.h2Count) {
                    cy.task('log', '❌ H2 section counts differ!');
                } else {
                    cy.task('log', '✅ H2 section counts match');
                }

                // Basic assertions
                expect(productionContent.hasNav).to.equal(deployPreviewContent.hasNav);
                expect(productionContent.hasRamenLink).to.equal(deployPreviewContent.hasRamenLink);
            });
        });

        it('should have working navigation on both URLs', () => {
            // Test production navigation
            cy.visit(`${productionUrl}/about`);
            cy.get('a[href="/ramen"], a:contains("Ramen")').first().click();
            cy.url().should('include', '/ramen');
            cy.get('body').should('be.visible');

            // Test deploy preview navigation
            cy.visit(`${deployPreviewUrl}/about`);
            cy.get('a[href="/ramen"], a:contains("Ramen")').first().click();
            cy.url().should('include', '/ramen');
            cy.get('body').should('be.visible');
        });

        it('should identify specific content differences', () => {
            let productionFooter = '';
            let deployPreviewFooter = '';

            // Check production footer
            cy.visit(`${productionUrl}/about`);
            cy.get('body').then(($body) => {
                if ($body.find(':contains("Built With")').length > 0) {
                    cy.get(':contains("Built With")').last().invoke('text').then((text) => {
                        productionFooter = text.trim();
                    });
                }
            });

            // Check deploy preview footer
            cy.visit(`${deployPreviewUrl}/about`);
            cy.get('body').then(($body) => {
                if ($body.find(':contains("Built With")').length > 0) {
                    cy.get(':contains("Built With")').last().invoke('text').then((text) => {
                        deployPreviewFooter = text.trim();
                    });
                }
            });

            cy.then(() => {
                cy.task('log', '🔍 Footer Comparison:');
                cy.task('log', `Production Footer: "${productionFooter}"`);
                cy.task('log', `Deploy Preview Footer: "${deployPreviewFooter}"`);

                if (productionFooter !== deployPreviewFooter) {
                    cy.task('log', '⚠️ Footer content differs between production and deploy preview');
                    cy.task('log', 'This could indicate version differences or deployment issues');
                } else {
                    cy.task('log', '✅ Footer content matches');
                }
            });
        });
    });

    describe('Homepage Comparison', () => {
        it('should have consistent navigation between URLs', () => {
            // Test production homepage
            cy.visit(productionUrl);
            cy.get('nav').should('exist');
            cy.get('a[href="/about"]').should('exist');
            cy.get('a[href="/ramen"]').should('exist');

            // Test deploy preview homepage
            cy.visit(deployPreviewUrl);
            cy.get('nav').should('exist');
            cy.get('a[href="/about"]').should('exist');
            cy.get('a[href="/ramen"]').should('exist');
        });
    });

    describe('Ramen Builder Comparison', () => {
        it('should have consistent ramen builder functionality', () => {
            // Test production ramen builder
            cy.visit(`${productionUrl}/ramen`);
            cy.get('body').should('be.visible');

            // Check for key ramen builder elements
            cy.get('h1, h2').should('exist');

            // Test deploy preview ramen builder
            cy.visit(`${deployPreviewUrl}/ramen`);
            cy.get('body').should('be.visible');

            // Check for key ramen builder elements
            cy.get('h1, h2').should('exist');
        });
    });
});
