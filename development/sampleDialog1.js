
//In future releases we will allow the dialogs to be localized. 
//The localization variables stores the title of the dialog, help, navigation text, code that launches the R help and the labels of all the controls
//title: The value of title is displayed in the top section of the dialog when the dialog is launched
//navigation: The value of navigation is displayed in the top navigation. You click the icon or the text in the top navigation to launch the dialog
//helpTitle: The title of the help dialog. This is the dialog that gets displayed when you click the ? icon on the dialog
//body: Enter the text displayed when the ? icon on the dialog is clicked. Only simple markup is supported, contents of body below for a sample
//r_help: Enter r code to launch the R help associated with a single R function namely the main R function associated with the dialog. 
//The R help is run when the R icon on the top right of the help dialog is clicked. The R help is launched in a separate browser"


var localization = {
    en: {
        title: "Enter the dialog title here",
        inputControl: "Enter a label for the textbox",
        independent: "Enter a label for the destination variable list",
        navigation: "Sample1",
        help: {
            helpTitle: "Enter a title here",
            r_help: "Enter the R help command to launch the R help. The R help is run when the R icon on the top right of the help dialog is clicked e.g. help(glm, package ='stats')",
            body: `

<b>Description</b></br>
Builds a binary logistic regression model.... <br/>
<br/>
<b>Usage</b>
<br/>
<code> 
modelname <- glm(dependentVariable ~ var1+var2+var3...,family =binomial(link='logit'),data=datasetName)
#Summarizing the model<br/>
summary(modelname)<br/>
#Displaying the Anova table<br/>
anova(modelname)<br/>
#Plots residuals vs. fitted, normal Q-Q, scale-location, residuals vs. leverage<br/>
plot(modelname)<br/>
#McFadden R2<br/>
pR2(Logistic1)<br/>
#odds ratio and 95% confidence interval<br/>
exp(cbind(OR=coef(Logistic1), confint(Logistic1,level=0.95)))<br/>
#Plot the model<br/>
plot(Logistic1)<br/>
</code> <br/>
<b>Arguments</b><br/>
<ul>
<li>
depVar: Name of the dependent variable.  If we have a dataset cars, with a variable class that we want to predict (dependent variable is class) enter class
</li>
<li>
indepVars: Names of the independent variable, separated by +. If we have a dataset cars, with independent  variable horsepower, enginesize, specify horsepower+enginesize). Categorical variables are automatically dummy coded.​
</li>
<li>
data: Name of the dataframe. When you open data frames or datasets e.g. csv, Excel files, SAS files in BlueSky Statistics, they are named Dataset1, Dataset2, Dataset3 So enter data=Dataset1​
</li>
</ul>
<b>Package</b></br>
glm</br>
<b>Help</b></br>
help(glm, package ='stats')</br>
<b>References</b></br>
https://datascienceplus.com/perform-logistic-regression-in-r/</br>
https://www.machinelearningplus.com/machine-learning/logistic-regression-tutorial-examples-r/</br>
<b>Other</b></br>
Click the R Help icon to get detailed R help​</br>
			`}
    }
}

//Every dialog must have a unique class name and id
//label: the value of the label property  stores the dialog title
//modalType: Can take values "one" or "two". The value of modalType determines the number of columns in the dialog layout. 
//RCode: This is the R code that is executed when the dialog is executes i.e. the > icon on the top right of the dialog is clicked
class sampleDialog1 extends baseModal {
    constructor() {
        var config = {
            id: "sampleDialog1",
            label: localization.en.title,
            splitProcessing:false,
            modalType: "two",
            RCode: `
paste(c({{selected.independent | safe}}))
print("{{selected.inputControl | safe}}")
`
        };
//The variable objects contains all the controls that will be displayed on the dialog
        var objects = {
//the srcVariableList control is a source variable list control that lists all the variables in the active/selected dataset
//The value of action controls whether variables from the source variable list are moved or copied. Valid values are "move" or "copy" 
            content_var: { el: new srcVariableList(config, {action: "move"}) },
//the input control is a textbox control
            inputControl: {
                el: new input(config, {
                    no: 'inputControl',
                    label: localization.en.inputControl,
                    placeholder: "",
                    required: true,
                    type: "character",
                    ml:3,
                    extraction: "TextAsIs",
                    value: "Test 123"
                })
            },

 //The dstVariable control is a variable list control
            independent: {
                el: new dstVariableList(config, {
                    label: localization.en.independent,
                    no: "independent",
                    required: true,
                    filter: "String|Numeric|Logical|Ordinal|Nominal|Scale",
                    extraction: "NoPrefix|UseComma|Enclosed",
                })
            },
     
        };
        const content = {
            //The value of head specifies which controls get displayed on the left most column and in which order
                //head: [objects.modelname.el.content],
                //The value of left specifies which controls get displayed on the left most column and in which order
                left: [objects.content_var.el.content],
                //The value of right specifies which controls get displayed on the right most column and in which order
                right: [objects.independent.el.content, objects.inputControl.el.content],
                //bottom: [objects.modelname.el.content],
            nav: {
                //The value of navigation is displayed in the top navigation. You click the icon or the text in the top navigation to launch the dialog
                name: localization.en.navigation,
                //The icon displayed in the top navigation
                icon: "icon-logistic_white_comp",
                datasetRequired: true,
                modal: config.id
            }
        };
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new sampleDialog1().render()