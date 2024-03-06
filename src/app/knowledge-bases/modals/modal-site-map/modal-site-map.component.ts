import { Component, OnInit, Output, EventEmitter, SimpleChanges, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KB, KbSettings } from 'app/models/kbsettings-model';
import { KB_LIMIT_CONTENT } from 'app/utils/util';

@Component({
  selector: 'modal-site-map',
  templateUrl: './modal-site-map.component.html',
  styleUrls: ['./modal-site-map.component.scss']
})
export class ModalSiteMapComponent implements OnInit {
  
  @Input() listSitesOfSitemap: any[];
  @Output() sendSitemap = new EventEmitter();
  @Output() saveKnowledgeBase = new EventEmitter();
  @Output() closeBaseModal = new EventEmitter();

  KB_LIMIT_CONTENT = KB_LIMIT_CONTENT;
  kbForm: FormGroup;
  buttonDisabled: boolean = true;
  isSitemapLoaded: boolean = false;
  listOfUrls: string;
  countSitemap: number;
  errorLimit: boolean = false;

  kb: KB = {
    _id: null,
    type: '',
    name: '',
    url: '',
    content: ''
  }

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.kbForm = this.createConditionGroup();
  }

  ngOnChanges(changes: SimpleChanges){
    // console.log('ModalSiteMapComponent changes: ', changes);
    
    if(this.listSitesOfSitemap.length > 0){
      this.listOfUrls = this.listSitesOfSitemap.join('\n');
      // console.log('ModalSiteMapComponent listOfUrls: ', this.listOfUrls);
      this.countSitemap = this.listSitesOfSitemap.length;
      this.isSitemapLoaded = true;
    } else {
      this.isSitemapLoaded = false;
    }
  }


  createConditionGroup(): FormGroup {
    const namePattern = /^[^&<>]{3,}$/;
    return this.formBuilder.group({
      url: ['', [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
      // name: ['', [Validators.required, Validators.pattern(namePattern)]]
    })
  }

  onChangeInput(event): void {
    if (this.kbForm.valid) {
      this.buttonDisabled = false;
    } else {
      this.buttonDisabled = true;
    }
  }


  onChangeList(event):void {
    // this.listSitesOfSitemap = this.listOfUrls.split("\n");
    this.listSitesOfSitemap = this.listOfUrls.split("\n").filter(function(row) {
      return row.trim() !== '';
    });
    this.countSitemap = this.listSitesOfSitemap.length;
  }

  onCloseBaseModal() {
    this.listSitesOfSitemap = [];
    this.listOfUrls = "";
    this.countSitemap = 0;
    this.isSitemapLoaded = false;
    this.closeBaseModal.emit();
  }

  onSendSitemap(){
    let body = {
      'sitemap': this.kb.url
    }
    this.sendSitemap.emit(body);
  }

  onSaveKnowledgeBase(){
    if(this.listSitesOfSitemap.length > this.KB_LIMIT_CONTENT){
      this.errorLimit = true;
    } else {
      this.errorLimit = false;
      const arrayURLS = this.listOfUrls.split("\n").filter(function(row) {
        return row.trim() !== '';
      });
      let body = {
        'list': arrayURLS
      }
      this.saveKnowledgeBase.emit(body);
    }
    
  }

}
