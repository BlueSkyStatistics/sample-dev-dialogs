var localization = {
    en: {
        title: "Merge Datasets",
        navigation: "Merge",
        out: "Enter the name of the merged dataset",
        in1: "Select the 1st dataset",
        in2: "Select the 2nd dataset",
        label1: "Merge Options",
        leftjoin: "Left Join (Keep only rows in first dataset)",
        rightjoin: "Right Join (Keep only rows in second dataset)",
        innerjoin: "Inner Join (Keep rows common to both datasets)",
        fulljoin: "Full Join (Keep all rows in either dataset)",
        label2: "Override the merge being performed on all common column names",
        by: "To override the default setting of the merge being performed on all common column names, enter a subset  of the common column names below seperated by ,  For e.g. country,region  The merge will be performed only on the common column names entered. Format this list as values separated by a comma, e.g., A,B,C",
        label3: "If columns names on which the merge is done are different in each dataset",
        byDiffNames: "Enter the matching column names separated by a comma, e.g, 'C'='D', 'B'='A'. Please use single quotes (  '  ) here.",
        label4: "If there are common column names in both data sets",
        suffix: "By default, .x and .y will be used as suffixes for common variables. If you want to change them, enter them here separated by a comma, e.g. 1,2. Note that any . will be replaced by a _ in the output data set",
        advOptions: "Advanced Options",
        help: {
            title: "Merge Datasets",
            r_help: "help(join, package=dplyr)",
            body: `
            <b>Description</b></br>
            Merge datasets will help you join 2 datasets together. By default, this dialog will look for common variable names within the 2 datasets and merge on the full set of common variables.<br/> If you would like to merge on a specific set of variables, you can specify those in the Advanced menu.<br/>
            inner_join: return all rows from x where there are matching values in y, and all columns from x and y. If there are multiple matches between x and y, all combination of the matches are returned.</br>
            left_join: return all rows from x, and all columns from x and y. Rows in x with no match in y will have NA values in the new columns. If there are multiple matches between x and y, all combinations of the matches are returned.</br>
            right_join: return all rows from y, and all columns from x and y. Rows in y with no match in x will have NA values in the new columns. If there are multiple matches between x and y, all combinations of the matches are returned.</br>
            full_join: return all rows and all columns from both x and y. Where there are not matching values, returns NA for the one missing.</br>
            <b>Usage</b>
            <br/>
            <code> 
            left_join(x, y, by = c(NULL), suffix = c(".x", ".y"), ...)
            right_join ( x , y , by = c( NULL ), suffix=c('.x','.y') )
            inner_join ( x , y , by = c( NULL ), suffix=c('.x','.y') )
            full_join ( x , y , by = c( NULL ), suffix=c('.x','.y') )
            </code> <br/>
            <b>Arguments</b><br/>
            <ul>
            <li>
            x: dataset to join
            </li>
            <li>
            y: dataset to join
            </li>
            <li>
            by: a character vector of variables to join by. If NULL, the default, *_join() will do a natural join, using all variables with common names across the two tables. A message lists the variables so that you can check they're right (to suppress the message, simply explicitly list the variables that you want to join). To join by different variables on x and y use a named vector. For example, by = c("a" = "b") will match x.a to y.b.
            </li>
            <li>
            suffix: If there are non-joined duplicate variables in x and y, these suffixes will be added to the output to disambiguate them. Should be a character vector of length 2.
            </li>
            </ul>
            <b>Value</b><br/>
            A tibble.<br/>
            <b>Package</b></br>
            dplyr</br>
            <b>Help</b></br>
            For detailed help click on the R icon on the top right hand side of this dialog overlay or run the following command help(left_join, package="dplyr") by creating a R code chunk by clicking + in the output window
`,
        }
    }
}
class sample5 extends baseModal {
    constructor() {
        var config = {
            id: "sample5",
            label: localization.en.title,
            modalType: "two",
            splitProcessing:false,
            RCode: `
require(dplyr)
by.var <- "{{selected.by | safe}}"
byDiffNames.var <- "{{selected.byDiffNames | safe}}"
by.text <- ifelse(by.var != "", by.var, ifelse(byDiffNames.var != "", byDiffNames.var, "NULL"))
{{selected.out | safe}} <- eval(parse(text = paste( "{{selected.mergetype | safe}}","(",{{selected.in1 | safe}},",",{{selected.in2 | safe}},",","by = c(",by.text,"),","{{selected.suffix | safe}}",")")))
cat("Warnings regarding differing attributes between merging variables can be safely ignored.")
BSkyLoadRefreshDataframe( "{{selected.out | safe}}" )

`,
        }
        var objects = {
            dataset_var: { el: new srcDataSetList(config, { action: "move" }) },
            out: {
                el: new input(config, {
                    no: 'out',
                    label: localization.en.out,
                    placeholder: "",
                    extraction: "TextAsIs",
                    value: "",
                    type: "character",
                    required: true,
                }),
            },
            in1: {
                el: new dstVariableList(config, {
                    label: localization.en.in1,
                    no: "in1",
                    filter: "Dataset",
                    extraction: "UseComma|Enclosed",
                    required: true,
                })
            },
            in2: {
                el: new dstVariable(config, {
                    label: localization.en.in2,
                    no: "in2",
                    filter: "Dataset",
                    extraction: "UseComma|Enclosed",
                    required: true,
                })
            },
            label1: { el: new labelVar(config, { label: localization.en.label1, h: 5, style: "mt-1", }) },
            leftjoin: {
                el: new radioButton(config, { label: localization.en.leftjoin, no: "mergetype", increment: "leftjoin", value: "left_join", state: "checked", extraction: "ValueAsIs" })
            },
            rightjoin: {
                el: new radioButton(config, { label: localization.en.rightjoin, no: "mergetype", increment: "rightjoin", value: "right_join", state: "", extraction: "ValueAsIs" })
            },
            innerjoin: {
                el: new radioButton(config, { label: localization.en.innerjoin, no: "mergetype", increment: "innerjoin", value: "inner_join", state: "", extraction: "ValueAsIs" })
            },
            fulljoin: {
                el: new radioButton(config, { label: localization.en.fulljoin, no: "mergetype", increment: "fulljoin", value: "full_join", state: "", extraction: "ValueAsIs" })
            },
            id: {
                el: new input(config, {
                    no: 'id',
                    label: localization.en.id,
                    placeholder: "",
                    allow_spaces:true,
                    extraction: "TextAsIs",
                    type: "character",
                    value: "",
                }),
            },
            label2: { el: new labelVar(config, { label: localization.en.label2, h: 5, style: "mt-2", }) },
            by: {
                el: new input(config, {
                    no: 'by',
                    label: localization.en.by,
                    placeholder: "",
                    allow_spaces:true,
                    extraction: "TextAsIs",
                    type: "character",
                    value: "",
                }),
            },
            label3: { el: new labelVar(config, { label: localization.en.label3, h: 5, style: "mt-2", }) },
            byDiffNames: {
                el: new input(config, {
                    no: 'byDiffNames',
                    allow_spaces:true,
                    label: localization.en.byDiffNames,
                    placeholder: "",
                    extraction: "TextAsIs",
                    type: "character",
                    value: "",
                }),
            },
            label4: { el: new labelVar(config, { label: localization.en.label4, h: 5, style: "mt-2", }) },
            suffix: {
                el: new input(config, {
                    no: 'suffix',
                    label: localization.en.suffix,
                    placeholder: "",
                    allow_spaces:true,
                    extraction: "CreateArray",
                    type: "character",
                    value: ".x,.y",
                }),
            },
        }
        var advOptions = {
            el: new optionsVar(config, {
                no: "advOptions",
                name: localization.en.advOptions,
                content: [
                    objects.label2.el,
                    objects.by.el,
                    objects.label3.el,
                    objects.byDiffNames.el,
                    objects.label4.el,
                    objects.suffix.el,
                ]
            })
        };
        const content = {
            head: [],
            left: [objects.dataset_var.el.content],
            right: [objects.out.el.content, objects.in1.el.content, objects.in2.el.content, objects.label1.el.content, objects.leftjoin.el.content, objects.rightjoin.el.content, objects.innerjoin.el.content, objects.fulljoin.el.content],
            bottom: [advOptions.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-merge_right",
                modal: config.id
            },
            sizeleft: 3,
            sizeright: 9
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new sample5().render()