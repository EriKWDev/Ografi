
const path = require("path")
const directoryTree = require("directory-tree")

const getIconFromType = (type) => {
    switch(type) {
        default:
        case "file":
            return "file-text"
            break

        case "directory":
            return "folder"
            break
    }
}

const treeHTML = (tree, level=1) => {
    let HTML = `<div level="${level}" class="directory-tree">`

    if(tree.children != null) {
        for(let child of tree.children) {
            HTML += `
                <div style="padding-left: calc(var(--directory-tree-indent) * ${level}); width: calc(100% - var(--directory-tree-indent) * ${level});" type="${child.type}" class="directory-tree-node">
                    <i data-feather="${getIconFromType(child.type)}"></i>
                    <div class="directory-tree-node-name">${child.name}</div>
                </div>
                ${treeHTML(child, level+1)}
            `

        }
    }

    HTML += `</div>`
    return HTML
}

const main = async () => {
    let directory = path.join(__dirname, "Notes")
    let tree = directoryTree(directory)
    console.log(tree)
    let HTML = treeHTML(tree)

    document.getElementById("directory-tree-container").innerHTML = HTML
}

main()