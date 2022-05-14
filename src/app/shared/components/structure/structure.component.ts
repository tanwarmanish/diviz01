import {
  Component,
  ContentChild,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'structure',
  templateUrl: './structure.component.html',
  styleUrls: ['./structure.component.css'],
})
export class StructureComponent implements OnInit {
  @ContentChild(TemplateRef) templateVariable: TemplateRef<any> | undefined;
  @Input() parentClass = 'row';
  @Input() childClass = 'col m12';
  @Input() parentOnly: boolean = false;
  @Input() childOnly: boolean = false;
  children: any = ['col m12'];

  ngOnInit(): void {
    this.children = this.childClass.split('|');
  }
}
