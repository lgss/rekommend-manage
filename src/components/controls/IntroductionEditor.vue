<template>
    <v-container>
        <v-tooltip left>
            <template v-slot:activator='{ on, attrs }'>
                <v-btn v-bind="attrs" v-on="on" color="primary" fab fixed right bottom @click="scrollTop()">
                    <v-icon>
                        mdi-chevron-up
                    </v-icon>
                </v-btn>
            </template>
            <span>Scroll to top</span>
        </v-tooltip>
        <v-container v-if="loading" class="text-center"> 
            <v-progress-circular indeterminate size="100" width="10" color="#dddddd"/>
        </v-container>
        <v-container v-else>  
            <v-row>
                <v-col md="12">
                    <span>
                        <h1>Contents</h1>
                        <ol>
                            <li><h2><a href="#general">General</a></h2></li>
                                <ul>
                                    <li><h3><a href="#landing">Landing</a></h3></li>
                                    <li><h3><a href="#completed">Assessment Completed</a></h3></li>
                                    <li><h3><a href="#terms">Terms and Conditions</a></h3></li>
                                    <li><h3><a href="#accessibility">Accessibility Statement</a></h3></li>
                                </ul>
                            <li><h2><a href="#journeycats">Journey Categories</a></h2></li>
                            <li><h2><a href="#journeys">Journeys</a></h2></li>
                                <ul>
                                    <li><h3><a href="#findedit">"How do I find and edit a journey?"</a></h3></li>
                                    <li><h3><a href="#tags">Tags</a></h3></li>
                                    <li><h3><a href="#wheretags">"Where are these tags?"</a></h3></li>
                                    <li><h3><a href="#typetags">“What is the difference between types of tags?”</a></h3></li>
                                    <li><h3><a href="#questiontags">Tags on questions:</a></h3></li>
                                    <li><h3><a href="#answertags">Tags on answers:</a></h3></li>
                                    <li><h3><a href="#resourcetags">Tags on resources:</a></h3></li>
                                </ul>
                            <li><h2><a href="#resources">Resources</a></h2></li>
                        </ol>
                        <p></p>
                        <a id="general"/><h1>General Tab</h1>
                        <h2>‘Theme’</h2>
                        <p>The theme page controls the overarching design of the assessment side of TECHknow. It allows you to directly edit the website ‘Title’, the primary colour (header) and the secondary colour (footer).</p>

                        <a id="landing"/><h2>‘Landing’</h2>
                        <p>The landing page allows you to directly edit the page in which every single user will first enter TECHknow and see. The page title and the body content which you wish user to read upon entry, and help them with their experience and what they should expect to find throughout the process.</p>

                        <a id="completed"/><h2>‘Assessment Completed’</h2>
                        <p>This is the pop-up in which users will be presented with before any results are shown. This gives them the ability to decline viewing results or view their results based on answered submitted. You are able to change the content and title of this pop up using this page.</p>

                        <a id="terms"/><h2>‘Terms and Conditions’</h2>
                        <p>On this page you’ll be able to review and change the separate T’s & C’s page for the service located on every page of TECHknow in the footer.</p>

                        <a id="accessibility"/><h2>‘Accessibility Statement’</h2>
                        <p>The accessibility statement MUST be available to any user at any point during the service and provide up to date info on the state of accessibility/features available using TECHknow. This page sits in the footer of the assessment on every page and body content/title are editable here.</p>

                        <a id="journeycats"/><h1>Journey Categories Tab</h1>
                        <p>When a user clicks ‘Start’ on their assessment they will be greeted with a question which requires an answer based on the area in which they need support. This ‘area’ selection page is controlled by the information within this tab. Add new answers/categories and tie these to Journey’s using this tab. You can select which ‘Journey(s)’ sit under what areas. Images for these categories can also be added at this point.</p>

                        <a id="journeys"/><h1>‘Journeys’ Tab</h1>
                        <p>Here you can create new journey’s or edit existing ones on the assessment.</p>

                        <a id="findedit"/><h2>“How do I find and edit a journey?”</h2>
                        <p>Editing a journey is simple. Use the dropdown to view a list of all journey’s and select the one that you wish to edit. Pages within that journey will then be visible to view, delete or add information to. Journey’s consist of multiple pages. Click into pages in the column on the left hand side of the page to add, remove or amend any information on that particular part of the journey.</p>

                        <a id="tags"/><h2>Tags</h2>
                        <h3>“What are tags?”</h3>
                        <p>‘Tags’ are the most important part of the journey set up. All tags will help when identifying what resources need to be hidden from or shown to a user on their results page at the end of their assessment. A tag is an identifying word that can be tied to both a resource or an answer to a question in a journey for example, “Theft”. When a user answers a question with the word “Theft” tagged to it, the system will then look for all resources with that same tag.</p>

                        <p>Users on the front end cannot see tags, they are system logic. Tags are also case sensitive, be careful when entering these. If you wish things to react as designed they must be matched perfectly.</p>

                        <a id="wheretags"/><h3>“Where are these tags?”</h3>
                        <p>Tags appear on every question</p>
                        <p>Tags appear on every answer</p>
                        <p>Tags appear on every resource</p>

                        <a id="typetags"/><h3>“What is the difference between types of tags?”</h3>
                        <a id="questiontags"/><h4>Tags on questions:</h4>
                        <p>You only need one of these. Either you want to SHOW or HIDE, they do the same thing. Equally if both are left blank, it will show on that journey regardless.</p>

                        <h4>Match tags</h4><p> - When editing a question these are used when you want to SHOW a question based off of an answer to a previous question (Conditional questions). E.g. If the answer to a previous question is ‘No’ and that answer is tagged with the same word as the ‘Match tag’ on this question, the assessment will then show this question to the user.</p>

                        <h4>Exclude tags</h4><p> - When editing a question these are used when you want to HIDE a question based off on an answer to a previous question. E.g. if the answer to a previous question is ‘No’ and that answer is tagged with the same word as the ‘Exclude tag’ on this question, the assessment will then hide this question from the user.</p>

                        <a id="answertags"/><h4>Tags on answers:</h4>
                        <p>You only need one of these. Either you want to SHOW or HIDE, they do the same thing. Equally if both are left blank, it will not produce any resource at the end.</p>

                        <h4>Match tags</h4><p> - When editing an answer these are used when you want to SHOW a resource based off of that answer.</p>

                        <h4>Exclude tags</h4><p> - When editing an answer these are used when you want to HIDE a resource based off of that answer.</p>

                        <a id="resourcetags"/><h4>Tags on resources:</h4>
                        <p>You only need one of these. Either you want to SHOW or HIDE, they do the same thing. Equally if both are left blank, this resource will not show</p>

                        <h4>Match tags</h4><p> - When editing a resource these are used when you want to tag a resource to an answer which will enable it to SHOW in a user's results.</p>

                        <h4>Exclude tags</h4><p> - When editing a resource these are used when you want to tag a resource to an answer which will enable it to HIDE in a user's results.</p>

                        <a id="resources"/><h1>‘Resources’ Tab</h1>
                        Resource can be a; 
                        <ul>
                            <li>Website</li>
                            <li>Video</li>
                            <li>Info graphic</li>
                            <li>Service</li>
                        </ul>
                        And many more digital and physical solutions to help users with their independence.
                            
                        <p>This is where you effectively create results for the user at the end of the assessment. These resources can be uniquely displayed when users answer specific questions or can be displayed for a whole journey using tags.</p>
                    </span>
                </v-col>
            </v-row>
        </v-container>
    </v-container>
    
</template>

<script>
import {playerEndpoint} from '@/utils/endpoints.js'

export default {
    name: "IntroductionEditor",
    created() {
        Promise.all([
            fetch(playerEndpoint + "/theme")
                .then((x) => x.json())
                .then((x) => {
                    this.appTitle = x.title;
                    this.appPrimary = x.primary;
                    this.appSecondary = x.secondary;
                }),
        ]).finally(() => {
            this.loading = false;
        });
    },
    methods: {
        scrollTop() {
            this.$vuetify.goTo(0)
        }
    }
};
</script>
<style scoped>
    #preview .v-card:hover {
        opacity: 0.5;
    }
    #preview {
        transform: matrix(0.75, 0, 0, 0.75, 0, 0);
        margin-top: 0px;
        margin-left: 20px;
        margin-right: 20px;
    }
</style>    