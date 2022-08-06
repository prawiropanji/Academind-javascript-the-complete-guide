class App {
  static init() {
    const activeProjects = new ProjectList('active');
    const finishedProjects = new ProjectList('finished');
    activeProjects.setSwitchHandler(
      finishedProjects.addProject.bind(finishedProjects)
    );
    finishedProjects.setSwitchHandler(
      activeProjects.addProject.bind(activeProjects)
    );
  }
}

class ProjectList {
  projects = [];

  constructor(type) {
    const projectItems = document.querySelectorAll(`#${type}-projects li`);
    this.type = type;
    for (const item of projectItems) {
      this.projects.push(
        new ProjectItem(item.id, this.switchProject.bind(this), this.type)
      );
    }
    // console.log(this.projects);
  }

  setSwitchHandler(switchHandler) {
    this.switchHandler = switchHandler;
  }

  switchProject(projectId) {
    this.switchHandler(
      // callback of otherInstance.addProject
      this.projects.find((project) => project.id === projectId)
    );
    this.projects = this.projects.filter((project) => project.id !== projectId);

    // console.log(this.projects);
  }

  addProject(project) {
    this.projects.push(project);

    const movedProject = DOMHelper.moveDOMEl(this.type, project.id);

    const switchButton = movedProject.querySelector('button:last-of-type');

    project.update(this.switchProject.bind(this));
    project.findSwitchButton(this.type);
  }
}

class ProjectItem {
  hasOpennedToolTip = false;

  constructor(projectId, updateProjectListHandler, type) {
    this.id = projectId;
    this.updateProjectListHandler = updateProjectListHandler;
    this.findMoreInfoButton();
    this.findSwitchButton(type);
  }

  update(updateProjectListFunction) {
    this.updateProjectListHandler = updateProjectListFunction;
    // this.findSwitchButton();
  }

  changeStateToolTip() {
    console.log(this.hasOpennedToolTip);
    this.hasOpennedToolTip = this.hasOpennedToolTip ? false : true;
    console.log(this.hasOpennedToolTip);
  }

  showMoreInfo() {
    if (this.hasOpennedToolTip) {
      return;
    }
    const toolTip = new ToolTip(this.changeStateToolTip.bind(this));

    toolTip.attach();

    this.changeStateToolTip();
  }

  findMoreInfoButton() {
    let moreInfoButton = document.querySelector(
      `#${this.id} button:first-of-type`
    );

    moreInfoButton.addEventListener('click', this.showMoreInfo.bind(this));
  }

  findSwitchButton(type) {
    let switchButton = document.querySelector(
      `#${this.id} button:last-of-type`
    );

    switchButton = DOMHelper.clearEventListener(switchButton);

    switchButton.textContent = type === 'active' ? 'Finish' : 'Activated';

    switchButton.addEventListener(
      'click',
      this.updateProjectListHandler.bind(null, this.id) // callback of switchProject
    );
  }
}

class DOMHelper {
  static moveDOMEl(targetProjectListType, projectId) {
    const projectListElement = document.querySelector(
      `#${targetProjectListType}-projects ul`
    );
    const projectElement = document.getElementById(projectId);

    projectListElement.appendChild(projectElement);

    return projectElement;
  }

  static clearEventListener(element) {
    const cloneElement = element.cloneNode(true);
    element.replaceWith(cloneElement);
    return cloneElement;
  }
}

class ToolTip {
  constructor(changeStateInfoFn) {
    this.changeStateInfo = changeStateInfoFn;
  }

  detach() {
    this.element.remove();
    this.changeStateInfo();
  }

  attach() {
    const infoElement = document.createElement('div');
    infoElement.className = 'card';
    infoElement.textContent = 'dummy!';
    infoElement.addEventListener('click', this.detach.bind(this));
    this.element = infoElement;
    document.body.append(infoElement);
  }
}

App.init();
