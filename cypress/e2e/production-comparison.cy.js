// Production vs Deploy Preview Comparison Test

describe('🔍 Production vs Deploy Preview Analysis', () => {
    const productionUrl = 'https://spaghettis.netlify.app';
    const deployPreviewUrl = 'https://deploy-preview-6--spaghettis.netlify.app';

    describe('Homepage Navigation Analysis', () => {
        it('should compare navigation elements between production and deploy preview', () => {
            let productionNav = {};
            let deployPreviewNav = {};

            // Analyze production navigation
            cy.visit(productionUrl);
            cy.get('body').should('be.visible');

            cy.get('nav').then(($nav) => {
                productionNav.hasNav = $nav.length > 0;
                if ($nav.length > 0) {
                    productionNav.navItems = [];
                    $nav.find('a').each((index, link) => {
                        const text = link.textContent.trim();
                        const href = link.getAttribute('href');
                        if (text && href) {
                            productionNav.navItems.push({ text, href });
                        }
                    });
                }
            });

            // Check for Edge Function Demo link specifically
            cy.get('body').then(($body) => {
                productionNav.hasEdgeDemo = $body.find('a:contains("Edge"), a[href*="edge"]').length > 0;
                productionNav.hasDeviceOptimize = $body.find('a:contains("Device"), a[href*="device"]').length > 0;
                productionNav.hasClassics = $body.find('a:contains("Classics"), a[href*="classics"]').length > 0;
                productionNav.hasImageCDN = $body.find('a:contains("Image"), a[href*="image"]').length > 0;
                productionNav.hasBlobs = $body.find('a:contains("Blobs"), a[href*="blobs"]').length > 0;
                productionNav.hasRevalidation = $body.find('a:contains("Revalidation"), a[href*="revalidation"]').length > 0;
            });

            // Analyze deploy preview navigation
            cy.visit(deployPreviewUrl);
            cy.get('body').should('be.visible');

            cy.get('nav').then(($nav) => {
                deployPreviewNav.hasNav = $nav.length > 0;
                if ($nav.length > 0) {
                    deployPreviewNav.navItems = [];
                    $nav.find('a').each((index, link) => {
                        const text = link.textContent.trim();
                        const href = link.getAttribute('href');
                        if (text && href) {
                            deployPreviewNav.navItems.push({ text, href });
                        }
                    });
                }
            });

            // Check for Edge Function Demo link specifically
            cy.get('body').then(($body) => {
                deployPreviewNav.hasEdgeDemo = $body.find('a:contains("Edge"), a[href*="edge"]').length > 0;
                deployPreviewNav.hasDeviceOptimize = $body.find('a:contains("Device"), a[href*="device"]').length > 0;
                deployPreviewNav.hasClassics = $body.find('a:contains("Classics"), a[href*="classics"]').length > 0;
                deployPreviewNav.hasImageCDN = $body.find('a:contains("Image"), a[href*="image"]').length > 0;
                deployPreviewNav.hasBlobs = $body.find('a:contains("Blobs"), a[href*="blobs"]').length > 0;
                deployPreviewNav.hasRevalidation = $body.find('a:contains("Revalidation"), a[href*="revalidation"]').length > 0;
            });

            // Compare and log differences
            cy.then(() => {
                cy.task('log', '🔍 NAVIGATION COMPARISON RESULTS:');
                cy.task('log', '=====================================');

                cy.task('log', `Production Navigation Items: ${productionNav.navItems?.length || 0}`);
                cy.task('log', `Deploy Preview Navigation Items: ${deployPreviewNav.navItems?.length || 0}`);

                cy.task('log', '\n📊 FEATURE COMPARISON:');
                cy.task('log', `Edge Demo - Production: ${productionNav.hasEdgeDemo}, Deploy: ${deployPreviewNav.hasEdgeDemo}`);
                cy.task('log', `Device Optimize - Production: ${productionNav.hasDeviceOptimize}, Deploy: ${deployPreviewNav.hasDeviceOptimize}`);
                cy.task('log', `Classics - Production: ${productionNav.hasClassics}, Deploy: ${deployPreviewNav.hasClassics}`);
                cy.task('log', `Image CDN - Production: ${productionNav.hasImageCDN}, Deploy: ${deployPreviewNav.hasImageCDN}`);
                cy.task('log', `Blobs - Production: ${productionNav.hasBlobs}, Deploy: ${deployPreviewNav.hasBlobs}`);
                cy.task('log', `Revalidation - Production: ${productionNav.hasRevalidation}, Deploy: ${deployPreviewNav.hasRevalidation}`);

                // Identify missing features
                const missingFeatures = [];
                if (productionNav.hasEdgeDemo && !deployPreviewNav.hasEdgeDemo) missingFeatures.push('Edge Demo');
                if (productionNav.hasDeviceOptimize && !deployPreviewNav.hasDeviceOptimize) missingFeatures.push('Device Optimize');
                if (productionNav.hasClassics && !deployPreviewNav.hasClassics) missingFeatures.push('Classics');
                if (productionNav.hasImageCDN && !deployPreviewNav.hasImageCDN) missingFeatures.push('Image CDN');
                if (productionNav.hasBlobs && !deployPreviewNav.hasBlobs) missingFeatures.push('Blobs');
                if (productionNav.hasRevalidation && !deployPreviewNav.hasRevalidation) missingFeatures.push('Revalidation');

                if (missingFeatures.length > 0) {
                    cy.task('log', `\n❌ MISSING FEATURES IN DEPLOY PREVIEW: ${missingFeatures.join(', ')}`);
                } else {
                    cy.task('log', '\n✅ All features present in both versions');
                }
            });
        });

        it('should test access to Edge Function Demo if available', () => {
            // Test production edge function
            cy.visit(productionUrl);
            cy.get('body').then(($body) => {
                if ($body.find('a:contains("Edge"), a[href*="edge"]').length > 0) {
                    cy.task('log', '🧪 Testing Edge Function access on production...');
                    cy.get('a:contains("Edge"), a[href*="edge"]').first().click();
                    cy.url().should('include', 'edge');
                    cy.get('body').should('be.visible');
                } else {
                    cy.task('log', '⚠️ No Edge Function link found on production homepage');
                }
            });

            // Test deploy preview edge function
            cy.visit(deployPreviewUrl);
            cy.get('body').then(($body) => {
                if ($body.find('a:contains("Edge"), a[href*="edge"]').length > 0) {
                    cy.task('log', '🧪 Testing Edge Function access on deploy preview...');
                    cy.get('a:contains("Edge"), a[href*="edge"]').first().click();
                    cy.url().should('include', 'edge');
                    cy.get('body').should('be.visible');
                } else {
                    cy.task('log', '⚠️ No Edge Function link found on deploy preview homepage');
                }
            });
        });

        it('should test direct access to edge/device-optimize', () => {
            // Test production device optimize
            cy.visit(`${productionUrl}/edge/device-optimize`);
            cy.get('body').should('be.visible');
            cy.then(() => {
                cy.task('log', '✅ Production /edge/device-optimize accessible');
            });

            // Test deploy preview device optimize
            cy.visit(`${deployPreviewUrl}/edge/device-optimize`);
            cy.get('body').should('be.visible');
            cy.then(() => {
                cy.task('log', '✅ Deploy preview /edge/device-optimize accessible');
            });
        });
    });

    describe('Component and Layout Differences', () => {
        it('should compare header/navigation components', () => {
            // Production header analysis
            cy.visit(productionUrl);
            cy.get('body').then(($body) => {
                const productionInfo = {
                    hasNetlifyLogo: $body.find('img[alt*="Netlify"]').length > 0,
                    hasGithubLink: $body.find('a[href*="github"]').length > 0,
                    headerLinks: $body.find('header a, nav a').length,
                    hasDeviceOptimizeLink: $body.find('a[href*="device-optimize"]').length > 0
                };

                cy.task('log', `\n📊 PRODUCTION HEADER ANALYSIS:`);
                cy.task('log', `Netlify Logo: ${productionInfo.hasNetlifyLogo}`);
                cy.task('log', `GitHub Link: ${productionInfo.hasGithubLink}`);
                cy.task('log', `Header Links: ${productionInfo.headerLinks}`);
                cy.task('log', `Device Optimize Link: ${productionInfo.hasDeviceOptimizeLink}`);
            });

            // Deploy preview header analysis
            cy.visit(deployPreviewUrl);
            cy.get('body').then(($body) => {
                const deployInfo = {
                    hasNetlifyLogo: $body.find('img[alt*="Netlify"]').length > 0,
                    hasGithubLink: $body.find('a[href*="github"]').length > 0,
                    headerLinks: $body.find('header a, nav a').length,
                    hasDeviceOptimizeLink: $body.find('a[href*="device-optimize"]').length > 0
                };

                cy.task('log', `\n📊 DEPLOY PREVIEW HEADER ANALYSIS:`);
                cy.task('log', `Netlify Logo: ${deployInfo.hasNetlifyLogo}`);
                cy.task('log', `GitHub Link: ${deployInfo.hasGithubLink}`);
                cy.task('log', `Header Links: ${deployInfo.headerLinks}`);
                cy.task('log', `Device Optimize Link: ${deployInfo.hasDeviceOptimizeLink}`);
            });
        });
    });
});
