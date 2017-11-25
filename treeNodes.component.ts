import { Component, OnInit } from '@angular/core';
import {TreeModule,TreeNode} from 'primeng/primeng';
import { Http } from "@angular/http";


@Component({
    templateUrl: './treeNodes.component.html'
    
})
export class TreeNodesComponent implements OnInit  {
    
    files: TreeNode[];
    selectedFiles: TreeNode[] = [];
    dataArray: string[] = [];

    constructor() {
    }

    ngOnInit() {
        this.files =
            [
                {
                    "label": "Documents",
                    "data": "Documents Folder",
                    "expandedIcon": "fa-folder-open",
                    "collapsedIcon": "fa-folder",
                    "leaf": false,
                    "children": [{
                            "label": "Work",
                            "data": "Work Folder",
                            "expandedIcon": "fa-folder-open",
                            "collapsedIcon": "fa-folder",
                            "leaf": false,
                            "children": [{"label": "Expenses.doc", "icon": "fa-file-word-o", "data": "Expenses Document", "leaf": true}, {"label": "Resume.doc", "icon": "fa-file-word-o", "data": "Resume Document", "leaf":true}]
                        },
                        {
                            "label": "Home",
                            "data": "Home Folder",
                            "expandedIcon": "fa-folder-open",
                            "collapsedIcon": "fa-folder",
                            "leaf": false,
                            "children": [{"label": "Invoices.txt", "icon": "fa-file-word-o", "data": "Invoices for this month", "leaf": true}]
                        }]
                },
                {
                    "label": "Pictures",
                    "data": "Pictures Folder",
                    "expandedIcon": "fa-folder-open",
                    "collapsedIcon": "fa-folder",
                    "leaf":false,
                    "children": [
                        {"label": "barcelona.jpg", "icon": "fa-file-image-o", "data": "Barcelona Photo", "leaf":true},
                        {"label": "logo.jpg", "icon": "fa-file-image-o", "data": "PrimeFaces Logo", "leaf":true},
                        {"label": "primeui.png", "icon": "fa-file-image-o", "data": "PrimeUI Logo", "leaf":true}]
                },
                {
                    "label": "Movies",
                    "data": "Movies Folder",
                    "expandedIcon": "fa-folder-open",
                    "collapsedIcon": "fa-folder",
                    "leaf":false,
                    "children": [{
                            "label": "Al Pacino",
                            "data": "Pacino Movies",
                            "leaf":false,
                            "children": [{"label": "Scarface", "icon": "fa-file-video-o", "data": "Scarface Movie", "leaf":true}, {"label": "Serpico", "icon": "fa-file-video-o", "data": "Serpico Movie", "leaf":true}]
                        },
                        {
                            "label": "Robert De Niro",
                            "data": "De Niro Movies",
                            "leaf":false,
                            "children": [{"label": "Goodfellas", "icon": "fa-file-video-o", "data": "Goodfellas Movie", "leaf":true}, {"label": "Untouchables", "icon": "fa-file-video-o", "data": "Untouchables Movie", "leaf":true}]
                        }]
                }
            ];
            this.dataArray = ["Expenses Document","Invoices for this month","PrimeFaces Logo","Untouchables Movie"];
            this.checkNode(this.files, this.dataArray);
          
    }

    checkNode(nodes:TreeNode[], str:string[]) {
        for(let i=0 ; i < nodes.length ; i++) {
            if(!nodes[i].leaf && nodes[i].children[0].leaf) {
                for(let j=0 ; j < nodes[i].children.length ; j++) {
                    if(str.includes(nodes[i].children[j].id)) {
                        if(!this.selectedFiles.includes(nodes[i].children[j])){
                            this.selectedFiles.push(nodes[i].children[j]);
                        }
                    }
                }
            }
            if (nodes[i].leaf) {
                return;
            }
            this.checkNode(nodes[i].children, str);
            let count = nodes[i].children.length;
            let c = 0;
            for(let j=0 ; j < nodes[i].children.length ; j++) {
                if(this.selectedFiles.includes(nodes[i].children[j])) {
                    c++;
                }
                if(nodes[i].children[j].partialSelected) nodes[i].partialSelected = true;
            }
            if(c == 0) {}
            else if(c == count) { 
                nodes[i].partialSelected = false;
                if(!this.selectedFiles.includes(nodes[i])){
                    this.selectedFiles.push(nodes[i]); 
                }
            }
            else {
                nodes[i].partialSelected = true;
            }
        }
    }

    nodeSelect(event) {
        this.addNode(event.node);
        this.selectedFiles = [];
        this.checkNode(this.files, this.dataArray);
    }
    
    nodeUnselect(event) {
        this.removeNode(event.node);
        this.selectedFiles = [];
        this.checkNode(this.files, this.dataArray);
    }

    removeNode(node: TreeNode) {
        if(node.leaf) {
            this.dataArray.splice(this.dataArray.indexOf(node.id),1);
            return;
        } 
        for(let i=0 ; i < node.children.length ; i++){
            this.removeNode(node.children[i]);
        }
    }

    addNode(node: TreeNode) {
        if(node.leaf) {
            if(!this.dataArray.includes(node.id)){
                this.dataArray.push(node.id);
            }
            return;
        }
        for(let i=0 ; i < node.children.length ; i++) {
            this.addNode(node.children[i]);
        }
    }
}
