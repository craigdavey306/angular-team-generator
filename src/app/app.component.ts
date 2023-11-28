import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TeamComponent } from './team/team.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [CommonModule, RouterOutlet, TeamComponent],
})
export class AppComponent {
  newMemberName = '';
  members: string[] = [];
  errorMessage = '';
  numberOfTeams: number | '' = '';
  teams: string[][] = [];

  onNumberofTeamsInput(value: string) {
    this.numberOfTeams = +value;
  }

  generateTeams() {
    if (!this.numberOfTeams || this.numberOfTeams < 0) {
      this.errorMessage = 'Invalid number of teams.';
      return;
    }

    if (this.members.length < this.numberOfTeams) {
      this.errorMessage = 'There are not enough members to generate teams.';
      return;
    }

    this.errorMessage = '';
    const allMembers = [...this.members];

    while (allMembers.length) {
      for (let i = 0; i < this.numberOfTeams; i++) {
        const randomIndex = Math.floor(Math.random() * allMembers.length);
        const member = allMembers.splice(randomIndex, 1)[0];

        if (!member) break;

        if (this.teams[i]) {
          this.teams[i].push(member);
        } else {
          this.teams[i] = [member];
        }
      }
    }

    this.members = [];
    this.numberOfTeams = '';
  }

  addMember() {
    if (!this.newMemberName) {
      this.errorMessage = 'Name must have a value.';
      return;
    }

    this.errorMessage = '';
    this.members.push(this.newMemberName);
    this.newMemberName = '';
  }

  onInput(member: string) {
    this.newMemberName = member;
  }
}
