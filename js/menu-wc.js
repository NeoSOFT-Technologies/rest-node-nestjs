'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nestjs-boilerolate documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="contributing.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CONTRIBUTING
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter additional">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#additional-pages"'
                            : 'data-target="#xs-additional-pages"' }>
                            <span class="icon ion-ios-book"></span>
                            <span>Documentation</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="additional-pages"' : 'id="xs-additional-pages"' }>
                                    <li class="chapter inner">
                                        <a data-type="chapter-link" href="additional-documentation/contribution.html" data-context-id="additional">
                                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#additional-page-abdd0aacc17250135246792d735508b32038b2622235737134e4b48c2f7bb4e2c059c83a9d915f44d258a89ff3edaf2deefa5c737f2cf36e3a4e9337310be223"' : 'data-target="#xs-additional-page-abdd0aacc17250135246792d735508b32038b2622235737134e4b48c2f7bb4e2c059c83a9d915f44d258a89ff3edaf2deefa5c737f2cf36e3a4e9337310be223"' }>
                                                <span class="link-name">Contribution</span>
                                                <span class="icon ion-ios-arrow-down"></span>
                                            </div>
                                        </a>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="additional-page-abdd0aacc17250135246792d735508b32038b2622235737134e4b48c2f7bb4e2c059c83a9d915f44d258a89ff3edaf2deefa5c737f2cf36e3a4e9337310be223"' : 'id="xs-additional-page-abdd0aacc17250135246792d735508b32038b2622235737134e4b48c2f7bb4e2c059c83a9d915f44d258a89ff3edaf2deefa5c737f2cf36e3a4e9337310be223"' }>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/contribution/bug-reports.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">Bug Reports</a>
                                            </li>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/contribution/features-requests.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">Features Requests</a>
                                            </li>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/contribution/pull-requests.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">Pull Requests</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <a data-type="chapter-link" href="additional-documentation/modules.html" data-context-id="additional">
                                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#additional-page-da087fe9311066abe3cc0ba3b90f839a196cbb1c14d323c17df585131cebe18d70166f6242ca4d76b24ae1c035413bd9c3ddd6e9ae4c21d55a44afc8949fc7d8"' : 'data-target="#xs-additional-page-da087fe9311066abe3cc0ba3b90f839a196cbb1c14d323c17df585131cebe18d70166f6242ca4d76b24ae1c035413bd9c3ddd6e9ae4c21d55a44afc8949fc7d8"' }>
                                                <span class="link-name">Modules</span>
                                                <span class="icon ion-ios-arrow-down"></span>
                                            </div>
                                        </a>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="additional-page-da087fe9311066abe3cc0ba3b90f839a196cbb1c14d323c17df585131cebe18d70166f6242ca4d76b24ae1c035413bd9c3ddd6e9ae4c21d55a44afc8949fc7d8"' : 'id="xs-additional-page-da087fe9311066abe3cc0ba3b90f839a196cbb1c14d323c17df585131cebe18d70166f6242ca4d76b24ae1c035413bd9c3ddd6e9ae4c21d55a44afc8949fc7d8"' }>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/modules/logger.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">Logger</a>
                                            </li>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/modules/request-response.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">Request Response</a>
                                            </li>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/modules/mailer.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">Mailer</a>
                                            </li>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/modules/database.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">Database</a>
                                            </li>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/modules/pattern.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">Pattern</a>
                                            </li>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/modules/crypto.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">Crypto</a>
                                            </li>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/modules/open-api/swagger.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">Open API/Swagger</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <a data-type="chapter-link" href="additional-documentation/miscellaneous.html" data-context-id="additional">
                                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#additional-page-1d7b46d12d642bafccd7e0387f3faac0cbeaf4f0049d99a15783a541d6279a82d00ff5607ffeb8946ddba1c7aa993161d9dc1aa40c298418a48ff958d43daaf3"' : 'data-target="#xs-additional-page-1d7b46d12d642bafccd7e0387f3faac0cbeaf4f0049d99a15783a541d6279a82d00ff5607ffeb8946ddba1c7aa993161d9dc1aa40c298418a48ff958d43daaf3"' }>
                                                <span class="link-name">Miscellaneous</span>
                                                <span class="icon ion-ios-arrow-down"></span>
                                            </div>
                                        </a>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="additional-page-1d7b46d12d642bafccd7e0387f3faac0cbeaf4f0049d99a15783a541d6279a82d00ff5607ffeb8946ddba1c7aa993161d9dc1aa40c298418a48ff958d43daaf3"' : 'id="xs-additional-page-1d7b46d12d642bafccd7e0387f3faac0cbeaf4f0049d99a15783a541d6279a82d00ff5607ffeb8946ddba1c7aa993161d9dc1aa40c298418a48ff958d43daaf3"' }>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/miscellaneous/git-commits.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">Git commits</a>
                                            </li>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/miscellaneous/known-issues.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">Known Issues</a>
                                            </li>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/miscellaneous/clean-docker-images.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">Clean Docker Images</a>
                                            </li>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/miscellaneous/installation-pretteri,-husky-&amp;-lint.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">Installation Pretteri, Husky &amp; Lint</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <a data-type="chapter-link" href="additional-documentation/trainings.html" data-context-id="additional">
                                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#additional-page-5e466ee25290b1d99cda05a58caf87baad32babff692224c5d9cb24c13baf3574ff1ced9595f158297ca7a268c33b4212157fbb29d4b3b7c89b722c64335fca0"' : 'data-target="#xs-additional-page-5e466ee25290b1d99cda05a58caf87baad32babff692224c5d9cb24c13baf3574ff1ced9595f158297ca7a268c33b4212157fbb29d4b3b7c89b722c64335fca0"' }>
                                                <span class="link-name">Trainings</span>
                                                <span class="icon ion-ios-arrow-down"></span>
                                            </div>
                                        </a>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="additional-page-5e466ee25290b1d99cda05a58caf87baad32babff692224c5d9cb24c13baf3574ff1ced9595f158297ca7a268c33b4212157fbb29d4b3b7c89b722c64335fca0"' : 'id="xs-additional-page-5e466ee25290b1d99cda05a58caf87baad32babff692224c5d9cb24c13baf3574ff1ced9595f158297ca7a268c33b4212157fbb29d4b3b7c89b722c64335fca0"' }>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/trainings/node-js-for-beginners.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">Node JS for Beginners</a>
                                            </li>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/trainings/nest-js-for-beginners.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">Nest JS for Beginners</a>
                                            </li>
                                            <li class="link for-chapter2">
                                                <a href="additional-documentation/trainings/git-for-beginners.html" data-type="entity-link" data-context="sub-entity" data-context-id="additional">Git for Beginners</a>
                                            </li>
                                        </ul>
                                    </li>
                        </ul>
                    </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-2d09609dc40cbe3e015b8c78ec530767e8fbedf5409141e915079752a2ffe9802b6b7c55c851b82fa0727db1d7e9d1e676a304669633acf751778f2e24e48c79"' : 'data-target="#xs-controllers-links-module-AppModule-2d09609dc40cbe3e015b8c78ec530767e8fbedf5409141e915079752a2ffe9802b6b7c55c851b82fa0727db1d7e9d1e676a304669633acf751778f2e24e48c79"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-2d09609dc40cbe3e015b8c78ec530767e8fbedf5409141e915079752a2ffe9802b6b7c55c851b82fa0727db1d7e9d1e676a304669633acf751778f2e24e48c79"' :
                                            'id="xs-controllers-links-module-AppModule-2d09609dc40cbe3e015b8c78ec530767e8fbedf5409141e915079752a2ffe9802b6b7c55c851b82fa0727db1d7e9d1e676a304669633acf751778f2e24e48c79"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-2d09609dc40cbe3e015b8c78ec530767e8fbedf5409141e915079752a2ffe9802b6b7c55c851b82fa0727db1d7e9d1e676a304669633acf751778f2e24e48c79"' : 'data-target="#xs-injectables-links-module-AppModule-2d09609dc40cbe3e015b8c78ec530767e8fbedf5409141e915079752a2ffe9802b6b7c55c851b82fa0727db1d7e9d1e676a304669633acf751778f2e24e48c79"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-2d09609dc40cbe3e015b8c78ec530767e8fbedf5409141e915079752a2ffe9802b6b7c55c851b82fa0727db1d7e9d1e676a304669633acf751778f2e24e48c79"' :
                                        'id="xs-injectables-links-module-AppModule-2d09609dc40cbe3e015b8c78ec530767e8fbedf5409141e915079752a2ffe9802b6b7c55c851b82fa0727db1d7e9d1e676a304669633acf751778f2e24e48c79"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AuthModule-77c4a21d8b5271ba7b81b11685c1b1eb7ffe767c3baf1157485e70692454d79a76bf31a89f477b46d6fbab60d0eccfd8ac033da46b0f772bf7876852a749b1a9"' : 'data-target="#xs-controllers-links-module-AuthModule-77c4a21d8b5271ba7b81b11685c1b1eb7ffe767c3baf1157485e70692454d79a76bf31a89f477b46d6fbab60d0eccfd8ac033da46b0f772bf7876852a749b1a9"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-77c4a21d8b5271ba7b81b11685c1b1eb7ffe767c3baf1157485e70692454d79a76bf31a89f477b46d6fbab60d0eccfd8ac033da46b0f772bf7876852a749b1a9"' :
                                            'id="xs-controllers-links-module-AuthModule-77c4a21d8b5271ba7b81b11685c1b1eb7ffe767c3baf1157485e70692454d79a76bf31a89f477b46d6fbab60d0eccfd8ac033da46b0f772bf7876852a749b1a9"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-77c4a21d8b5271ba7b81b11685c1b1eb7ffe767c3baf1157485e70692454d79a76bf31a89f477b46d6fbab60d0eccfd8ac033da46b0f772bf7876852a749b1a9"' : 'data-target="#xs-injectables-links-module-AuthModule-77c4a21d8b5271ba7b81b11685c1b1eb7ffe767c3baf1157485e70692454d79a76bf31a89f477b46d6fbab60d0eccfd8ac033da46b0f772bf7876852a749b1a9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-77c4a21d8b5271ba7b81b11685c1b1eb7ffe767c3baf1157485e70692454d79a76bf31a89f477b46d6fbab60d0eccfd8ac033da46b0f772bf7876852a749b1a9"' :
                                        'id="xs-injectables-links-module-AuthModule-77c4a21d8b5271ba7b81b11685c1b1eb7ffe767c3baf1157485e70692454d79a76bf31a89f477b46d6fbab60d0eccfd8ac033da46b0f772bf7876852a749b1a9"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CoreModule.html" data-type="entity-link" >CoreModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DatabaseModule.html" data-type="entity-link" >DatabaseModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/EmailHandlerModule.html" data-type="entity-link" >EmailHandlerModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-EmailHandlerModule-4f0c88d13d79e3b469e8d62b49e272035279554471d2ad0cb369bca148db158dbff7b7018b719a084989146a10c55aba88463be13eb4da5481115c806053ad56"' : 'data-target="#xs-injectables-links-module-EmailHandlerModule-4f0c88d13d79e3b469e8d62b49e272035279554471d2ad0cb369bca148db158dbff7b7018b719a084989146a10c55aba88463be13eb4da5481115c806053ad56"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-EmailHandlerModule-4f0c88d13d79e3b469e8d62b49e272035279554471d2ad0cb369bca148db158dbff7b7018b719a084989146a10c55aba88463be13eb4da5481115c806053ad56"' :
                                        'id="xs-injectables-links-module-EmailHandlerModule-4f0c88d13d79e3b469e8d62b49e272035279554471d2ad0cb369bca148db158dbff7b7018b719a084989146a10c55aba88463be13eb4da5481115c806053ad56"' }>
                                        <li class="link">
                                            <a href="injectables/EmailHandlerService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmailHandlerService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TestCoreModule.html" data-type="entity-link" >TestCoreModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UsersModule-b38c1e3223eacb354dd445311a1f105878168e5655d61d524110403bb873fc60097441f2ee702b4a4cdd531a2a0927bf27ee50813ab48d66308167ccb8920850"' : 'data-target="#xs-controllers-links-module-UsersModule-b38c1e3223eacb354dd445311a1f105878168e5655d61d524110403bb873fc60097441f2ee702b4a4cdd531a2a0927bf27ee50813ab48d66308167ccb8920850"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-b38c1e3223eacb354dd445311a1f105878168e5655d61d524110403bb873fc60097441f2ee702b4a4cdd531a2a0927bf27ee50813ab48d66308167ccb8920850"' :
                                            'id="xs-controllers-links-module-UsersModule-b38c1e3223eacb354dd445311a1f105878168e5655d61d524110403bb873fc60097441f2ee702b4a4cdd531a2a0927bf27ee50813ab48d66308167ccb8920850"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UsersModule-b38c1e3223eacb354dd445311a1f105878168e5655d61d524110403bb873fc60097441f2ee702b4a4cdd531a2a0927bf27ee50813ab48d66308167ccb8920850"' : 'data-target="#xs-injectables-links-module-UsersModule-b38c1e3223eacb354dd445311a1f105878168e5655d61d524110403bb873fc60097441f2ee702b4a4cdd531a2a0927bf27ee50813ab48d66308167ccb8920850"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-b38c1e3223eacb354dd445311a1f105878168e5655d61d524110403bb873fc60097441f2ee702b4a4cdd531a2a0927bf27ee50813ab48d66308167ccb8920850"' :
                                        'id="xs-injectables-links-module-UsersModule-b38c1e3223eacb354dd445311a1f105878168e5655d61d524110403bb873fc60097441f2ee702b4a4cdd531a2a0927bf27ee50813ab48d66308167ccb8920850"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#controllers-links"' :
                                'data-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#entities-links"' :
                                'data-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ErrorHandler.html" data-type="entity-link" >ErrorHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ValidateUserDto.html" data-type="entity-link" >ValidateUserDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppLogger.html" data-type="entity-link" >AppLogger</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RequestHandler.html" data-type="entity-link" >RequestHandler</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ResponseHandler.html" data-type="entity-link" >ResponseHandler</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserDbRepository.html" data-type="entity-link" >UserDbRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/IMailAuth.html" data-type="entity-link" >IMailAuth</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IMailConfig.html" data-type="entity-link" >IMailConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IMailOptions.html" data-type="entity-link" >IMailOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IMailResponse.html" data-type="entity-link" >IMailResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserRepository.html" data-type="entity-link" >UserRepository</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});