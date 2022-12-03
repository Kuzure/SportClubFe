import { Pipe, PipeTransform } from '@angular/core';
import { CoachGroupList } from '../models/coach-list-model';

@Pipe({
  name: 'groupsName',
})
export class GroupsNamePipe implements PipeTransform {
  groups: string = '';
  transform(group: Array<CoachGroupList>): string {
    if (group === null) {
      return '';
    }
    group.forEach((x) => (this.groups = this.groups + x.groupName + ','));
    return this.groups;
  }
}
